import _ from "lodash";
import { FETCH_RECIPES, FETCH_RECIPE, DELETE_RECIPE } from "../actions";

export default function(state = {}, action) {
  switch (action.type) {
    case DELETE_RECIPE:
      return _.omit(state, action.payload);
    case FETCH_RECIPE:
      return { ...state, [action.payload.data.id]: action.payload.data };
    case FETCH_RECIPES:
      return _.mapKeys(action.payload.data.results, "id");
    default:
      return state;
  }
}
