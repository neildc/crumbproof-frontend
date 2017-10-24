import _ from "lodash";
import { FETCH_ACTIVITIES, FETCH_ACTIVITY, DELETE_ACTIVITY } from "../actions/actions_activity";
import { FETCH_RECIPE_ACTIVITIES } from "../actions/actions_recipe";

export default function(state = {}, action) {
  switch (action.type) {
  case DELETE_ACTIVITY:
    return _.omit(state.byId, action.payload);

  case FETCH_ACTIVITY:
    return {
      ...state,
      "byId" : {
        ...state["byId"],
        [action.payload.data.id]: action.payload.data
      }
    };

  case FETCH_ACTIVITIES:
  case FETCH_RECIPE_ACTIVITIES:
    return {
      "byId" : {
        ...state["byId"],
        ..._.mapKeys(action.payload.data.results, "id"),
      },
      "next": action.payload.data.next
    };

  default:
    return state;
  }
}
