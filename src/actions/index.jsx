import axios from "axios";
import { ROOT_URL } from "../constants/hosts";

export const FETCH_RECIPES = "fetch_recipes";
export const FETCH_RECIPE = "fetch_recipe";
export const CREATE_RECIPE = "create_recipe";
export const DELETE_RECIPE = "delete_recipe";

export const FETCH_ACTIVITIES = "fetch_activities";
export const FETCH_ACTIVITY = "fetch_activity";
export const CREATE_ACTIVITY = "create_activity";
export const DELETE_ACTIVITY = "delete_activity";


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

export function fetchActivities() {
  const request = axios.get(`${ROOT_URL}/activities/`);

  return {
    type: FETCH_ACTIVITIES,
    payload: request
  };
}

export function createActivity(values, callback) {

  const request = axios
    .post(`${ROOT_URL}/activities/`, values, {
      headers: {
        Authorization: "Token " + localStorage.getItem("token")
      }
    })
    .then(() => callback());

  return {
    type: CREATE_ACTIVITY,
    payload: request
  };
}

export function fetchActivity(id) {
  const request = axios.get(`${ROOT_URL}/activities/${id}/`);

  return {
    type: FETCH_ACTIVITY,
    payload: request
  };
}

export function deleteActivity(id, callback) {

  // eslint-disable-next-line
  const request = axios
    .delete(`${ROOT_URL}/activities/${id}/`, {
      headers: {
        Authorization: "Token " + localStorage.getItem("token")
      }
    })
    .then(() => callback());

  return {
    type: DELETE_ACTIVITY,
    payload: id
  };
}
