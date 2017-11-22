import axios from 'axios';
import { ROOT_URL } from '../constants/hosts';

export const AUTH_LOGIN = 'auth_login';
export const AUTH_LOGOUT = 'auth_logout';
export const AUTH_REGISTER = 'auth_register';
export const AUTH_FORBIDDEN = 'auth_forbidden';
export const AUTH_CLEAR_ERROR = 'auth_clear_error';
export const AUTH_CHECK_LOCAL_STORAGE = 'auth_check_local_storage';

export function authLogin(values, callback) {
  const request = axios
    .post(`${ROOT_URL}/rest-auth/login/`, values)
    .then((resp) => {
      callback();
      return ({ user: values.username, token: resp.data.key });
    });

  return {
    type: AUTH_LOGIN,
    payload: request,
  };
}

export function authLogout() {
  return {
    type: AUTH_LOGOUT,
    payload: null,
  };
}

export function authRegister(values, callback) {
  const request = axios
    .post(`${ROOT_URL}/rest-auth/registration/`, values)
    .then((resp) => {
      callback();
      return ({ user: values.username, token: resp.data.key });
    });


  return {
    type: AUTH_REGISTER,
    payload: request,
  };
}

export function authForbidden(errorMessage) {
  return {
    type: AUTH_FORBIDDEN,
    payload: errorMessage,
  };
}

export function authCheckLocalStorage() {
  return {
    type: AUTH_CHECK_LOCAL_STORAGE,
    payload: null,
  };
}
