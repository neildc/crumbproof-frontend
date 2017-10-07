import axios from "axios";
import _ from "lodash";

export const FETCH_RECIPES = "fetch_recipes";
export const FETCH_RECIPE = "fetch_recipe";
export const CREATE_RECIPE = "create_recipe";
export const DELETE_RECIPE = "delete_recipe";

const ROOT_URL = "http://localhost:8000";

export function fetchRecipes() {
  const request = axios.get(`${ROOT_URL}/recipes/`);

  return {
    type: FETCH_RECIPES,
    payload: request
  };
}

export function createRecipe(values, callback) {

  // We need some way to keep track of the order of the steps in the db
  for (var i=0; i < values.steps.length; i++) {
    values.steps[i].stepNumber = i+1;
  }

  const request = axios
    .post(`${ROOT_URL}/recipes/`, values)
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
    .delete(`${ROOT_URL}/recipes/${id}/`)
    .then(() => callback());

  return {
    type: DELETE_RECIPE,
    payload: id
  };
}
