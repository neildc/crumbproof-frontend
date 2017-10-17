import {
  AUTH_LOGIN,
  AUTH_LOGOUT,
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
    // localStorage.setItem('token', action.payload.data.key);
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

  case AUTH_CLEAR_ERROR:
    return {...state, "error": null};

  default:
    return state;
  }
}
