import axios from "axios";

export const AUTH_LOGIN = "auth_login";
export const AUTH_LOGOUT = "auth_logout";
export const AUTH_CLEAR_ERROR = "auth_clear_error";

const ROOT_URL = "http://localhost:8000";

export function authLogin(values, callback) {

  const request = axios
    .post(`${ROOT_URL}/rest-auth/login/`, values)
    .then((resp) => {
      callback();
      return ({user:values.username, token:resp.data.key});
    });

  return {
    type: AUTH_LOGIN,
    payload: request
  };
}

export function authLogout () {

  return {
    type: AUTH_LOGOUT,
    payload: null
  };
}

export function authClearError () {

  return {
    type: AUTH_CLEAR_ERROR,
    payload: null
  };
}
