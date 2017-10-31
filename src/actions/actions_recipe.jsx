import _ from "lodash";
import axios from "axios";
import { ROOT_URL } from "../constants/hosts";

export const FETCH_RECIPES = "fetch_recipes";
export const FETCH_RECIPE = "fetch_recipe";
export const FETCH_RECIPE_ACTIVITIES = "fetch_recipe_activities";
export const CREATE_RECIPE = "create_recipe";
export const DELETE_RECIPE = "delete_recipe";

export function fetchRecipes() {
  const request = axios.get(`${ROOT_URL}/recipes/`);

  return {
    type: FETCH_RECIPES,
    payload: request
  };
}

/*
 * The values passed stored in the state from redux form are all strings
 *
 * Our API requires that values are numbers are either ints or floats
 *
 */
function convertRecipeNumberValues(values) {

  values.bake_time = Number(values.bake_time);
  values.oven_temperature = Number(values.oven_temperature);
  values.yield_count = Number(values.yield_count);

  values.ingredients = _.map(values.ingredients, (i) => {
    return { ...i, "quantity": Number(i.quantity)}
  });

  values.instructions = _.map(values.instructions, (i) => {
    if (!i.time_gap_to_next) {
      return i;
    }

    return {...i, "time_gap_to_next" : Number(i.time_gap_to_next)};
  });
}

export function createRecipe(values, callback) {

  convertRecipeNumberValues(values)

  let payload = {
    diff: null,
    data: {
      bake_time : values.bake_time,
      name: values.name,
      instructions: values.instructions,
      ingredients: values.ingredients,
      oven_temperature: values.oven_temperature,
      yield_count: values.yield_count,
      yield_type: values.yield_type
    },
    base_recipe : null,
    parent: null,
  }

  const request = axios
    .post(`${ROOT_URL}/recipes/`, payload, {
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

export function fetchRecipeActivities(id) {
  const request = axios.get(`${ROOT_URL}/recipes/${id}/activities/`);

  return {
    type: FETCH_RECIPE_ACTIVITIES,
    payload: request
  };
}
