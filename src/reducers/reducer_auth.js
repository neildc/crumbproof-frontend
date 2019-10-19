import {
  AUTH_CHECK_LOCAL_STORAGE,
  AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_REGISTER,
  AUTH_TOGGLE_CONTENT_VISIBILITY,
  AUTH_FORBIDDEN
} from "../actions/actions_auth";

import { CLEAR_FEEDBACK_MESSAGE } from "../actions/actions_feedback_messages";
import { LS_USER_KEY, LS_TOKEN_KEY, LS_CONTENT_VIS_KEY } from "../constants/local_storage_keys";

const DEFAULT_ERROR_MESSAGE = "Please check your internet or try again later";


export default function(state = {}, action) {
  switch (action.type) {
    case AUTH_LOGIN:
      /* TODO: research if it is it bad practice to put side effects in reducers
     *       localStorage.
     *
     *  Moved this logic to a callback that gets passed into the axios promise
     *  since we can't access the history (URL) for react-router.
     *
     *  Maybe in the future we could use
     *  https://github.com/ReactTraining/react-router/tree/master/packages/react-router-redux
     * so that we can access history anywhere including here.
     */
      if (action.error) {
        if (action.payload.response) {
          switch (action.payload.response.status) {
            case 400:
              return { error: "Please enter a valid username/password" };
            default:
              return { error: DEFAULT_ERROR_MESSAGE };
          }
        }
        return { error: DEFAULT_ERROR_MESSAGE };
      }
      localStorage.setItem(LS_TOKEN_KEY, action.payload.token);
      localStorage.setItem(LS_USER_KEY, action.payload.user);
      return { user: action.payload.user };

    case AUTH_LOGOUT:
      localStorage.removeItem(LS_TOKEN_KEY);
      localStorage.removeItem(LS_USER_KEY);
      return { user: null, message: "Logged out" };

    case AUTH_REGISTER:
      /* TODO : Use SubmitValidation from redux-form to show per field errors
     *            https://redux-form.com/7.1.1/examples/submitvalidation/
     */

      if (action.error) {
        if (action.payload.response) {
          const resp = action.payload.response;

          switch (resp.status) {
            case 400: {
              const fields = [
                "username",
                "password1",
                "password2",
                "non_field_errors"
              ];

              /* For now we will just show the first error that appears
           * from the response, its not great but it beats having
           * no user feedback at all
           */
              for (const field of fields) {
                if (resp.data[field]) {
                  return { error: resp.data[field][0] };
                }
              }
              break;
            }
            default: {
              return { error: DEFAULT_ERROR_MESSAGE };
            }
          }
        }
        return { error: DEFAULT_ERROR_MESSAGE };
      }
      localStorage.setItem(LS_TOKEN_KEY, action.payload.token);
      localStorage.setItem(LS_USER_KEY, action.payload.user);
      return { user: action.payload.user };

    case AUTH_FORBIDDEN:
      return { error: action.payload };

    case CLEAR_FEEDBACK_MESSAGE:
      if (action.payload === "auth") {
        return { ...state, error: null, message: null };
      } else {
        return state;
      }

    case AUTH_TOGGLE_CONTENT_VISIBILITY:
      let toggled = !state.contentVisibilityUserOnly;
      localStorage.setItem(LS_CONTENT_VIS_KEY, toggled);

      return { ...state, contentVisibilityUserOnly: toggled };

    case AUTH_CHECK_LOCAL_STORAGE:
      if (
        localStorage.getItem(LS_TOKEN_KEY) !== null &&
        localStorage.getItem(LS_USER_KEY) !== null
      ) {
        return {
          ...state,
          user: localStorage.getItem(LS_USER_KEY),
            contentVisibilityUserOnly: JSON.parse(localStorage.getItem(LS_CONTENT_VIS_KEY))
        };
      }
      return state;

    default:
      return state;
  }
}
