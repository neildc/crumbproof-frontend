import { AUTH_LOGIN } from "../actions";

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
    return state;

  default:
    return state;
  }
}
