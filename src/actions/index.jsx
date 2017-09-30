import axios from "axios";

export const FETCH_RECIPES = "fetch_recipes";
export const FETCH_RECIPE = "fetch_recipe";
export const CREATE_RECIPE = "create_recipe";
export const DELETE_RECIPE = "delete_recipe";

const ROOT_URL = "http://reduxblog.herokuapp.com/api";
const API_KEY = "?key=PAPERCLIP1234";

export function fetchRecipes() {
  const request = axios.get(`${ROOT_URL}/recipes${API_KEY}`);

  return {
    type: FETCH_RECIPES,
    payload: request
  };
}

export function createRecipe(values, callback) {
  const request = axios
    .recipe(`${ROOT_URL}/recipes${API_KEY}`, values)
    .then(() => callback());

  return {
    type: CREATE_RECIPE,
    payload: request
  };
}

export function fetchRecipe(id) {
  const request = axios.get(`${ROOT_URL}/recipes/${id}${API_KEY}`);

  return {
    type: FETCH_RECIPE,
    payload: request
  };
}

export function deleteRecipe(id, callback) {
  const request = axios
    .delete(`${ROOT_URL}/recipes/${id}${API_KEY}`)
    .then(() => callback());

  return {
    type: DELETE_RECIPE,
    payload: id
  };
}
