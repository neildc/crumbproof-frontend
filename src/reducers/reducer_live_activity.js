import {
  START_LIVE_ACTIVITY,
  DISCARD_LIVE_ACTIVITY,
  FETCH_LIVE_ACTIVITY,
  LIVE_ACTIVITY_NEXT_STEP,
  LIVE_ACTIVITY_START_TIMER,
} from '../actions/actions_live_activity';

export default function (state = {}, action) {
  switch (action.type) {
    case DISCARD_LIVE_ACTIVITY:
    case START_LIVE_ACTIVITY:
      // Reset the state
      return {};

    case FETCH_LIVE_ACTIVITY:
      return { ...action.payload.data };

    case LIVE_ACTIVITY_NEXT_STEP:
      const { current_step, end_times } = action.payload.data;

      return {
        ...state,
        current_step,
        end_times: { ...state.end_times, ...end_times },
      };

    case LIVE_ACTIVITY_START_TIMER:
      const { start_times } = action.payload.data;

      return {
        ...state,
        start_times: { ...state.start_times, ...start_times },
      };

    default:
      return state;
  }
}
