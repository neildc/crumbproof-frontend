import axios from "axios";
import _ from "lodash";

export const FETCH_RECIPES = "fetch_recipes";
export const FETCH_RECIPE = "fetch_recipe";
export const CREATE_RECIPE = "create_recipe";
export const DELETE_RECIPE = "delete_recipe";
export const AUTH_LOGIN = "auth_login";

const ROOT_URL = "http://localhost:8000";

export function authLogin(values, callback) {

  const request = axios
    .post(`${ROOT_URL}/rest-auth/login/`, values)
    .then((resp) => callback(resp));

  return {
    type: AUTH_LOGIN,
    payload: request
  };
}

export function fetchRecipes() {
  const request = axios.get(`${ROOT_URL}/recipes/`);

  return {
    type: FETCH_RECIPES,
    payload: request
  };
}

export function createRecipe(values, callback) {

  // We need some way to keep track of the order of the steps in the db
  for (var i=0; i < values.instructions.length; i++) {
    values.instructions[i].step_number = i+1;
  }

  const request = axios
    .post(`${ROOT_URL}/recipes/`, values, {
      headers: {
        Authorization: "Token " + localStorage.getItem("token")
      }
    })
    .then(() => callback());

  return {
    type: CREATE_RECIPE,
    payload: request
  };
}

export function fetchRecipe(id) {
  const request = axios.get(`${ROOT_URL}/recipes/${id}/`);

  return {
    type: FETCH_RECIPE,
    payload: request
  };
}

export function deleteRecipe(id, callback) {
  const request = axios
    .delete(`${ROOT_URL}/recipes/${id}/`, {
      headers: {
        Authorization: "Token " + localStorage.getItem("token")
      }
    })
    .then(() => callback());

  return {
    type: DELETE_RECIPE,
    payload: id
  };
}
