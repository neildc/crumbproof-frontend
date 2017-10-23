import axios from "axios";
import { ROOT_URL } from "../constants/hosts";

export const FETCH_RECIPES = "fetch_recipes";
export const FETCH_RECIPE = "fetch_recipe";
export const CREATE_RECIPE = "create_recipe";
export const DELETE_RECIPE = "delete_recipe";

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

  // eslint-disable-next-line
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
