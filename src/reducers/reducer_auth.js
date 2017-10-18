import {
  AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_REGISTER,
  AUTH_FORBIDDEN,
  AUTH_CLEAR_ERROR
} from "../actions/actions_auth";

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
        case (400):
          return {"error": "Please enter a valid username/password"};
        default:
          return {"error": DEFAULT_ERROR_MESSAGE};
        }

      }
      return {"error": DEFAULT_ERROR_MESSAGE};

    } else {
      localStorage.setItem('token', action.payload.token);
      return {"user": action.payload.user};
    }

  case AUTH_LOGOUT:
    localStorage.removeItem('token');
    return {"user": null};

  case AUTH_REGISTER:

    /* TODO : Use SubmitValidation from redux-form to show per field errors
     *            https://redux-form.com/7.1.1/examples/submitvalidation/
     */

    if (action.error) {
      if (action.payload.response) {

        let resp = action.payload.response;

        switch (resp.status) {
        case (400):
          let fields = [ "username"
                       , "password1"
                       , "password2"
                       , "non_field_errors"
                       ];

          /* For now we will just show the first error that appears
           * from the response, its not great but it beats having
           * no user feedback at all
           */
          for (let field of fields) {
            if (resp.data[field]) {
              return {"error": resp.data[field][0]};
            }
          }
          break;
        default:
          return {"error": DEFAULT_ERROR_MESSAGE};
        }

      }
      return {"error": DEFAULT_ERROR_MESSAGE};

    } else {
      localStorage.setItem('token', action.payload.token);
      return {"user": action.payload.user};
    }

  case AUTH_FORBIDDEN:
    return {"error": action.payload};

  case AUTH_CLEAR_ERROR:
    return {...state, "error": null};

  default:
    return state;
  }
}
