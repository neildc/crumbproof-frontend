import _ from 'lodash';
import {
  FETCH_ACTIVITIES,
  FETCH_ACTIVITY,
  DELETE_ACTIVITY,
} from '../actions/actions_activity';

export default function (state = {}, action) {
  switch (action.type) {
    case DELETE_ACTIVITY:

      return {
        ...state,
        byId: _.omit(state.byId, action.payload),
      };

    case FETCH_ACTIVITY:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload.data.id]: action.payload.data,
        },
      };

    case FETCH_ACTIVITIES:
      return {
        byId: {
          ...state.byId,
          ..._.mapKeys(action.payload.data.results, 'id'),
        },
        next: action.payload.data.next,
      };

    default:
      return state;
  }
}
