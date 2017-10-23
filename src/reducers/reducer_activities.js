import _ from "lodash";
import { FETCH_ACTIVITIES, FETCH_ACTIVITY, DELETE_ACTIVITY } from "../actions/actions_activity";

export default function(state = {}, action) {
  switch (action.type) {
  case DELETE_ACTIVITY:
    return _.omit(state, action.payload);
  case FETCH_ACTIVITY:
    return { ...state, [action.payload.data.id]: action.payload.data };
  case FETCH_ACTIVITIES:
    return _.mapKeys(action.payload.data.results, "id");
  default:
    return state;
  }
}
