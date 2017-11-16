import axios from 'axios';
import { ROOT_URL } from '../constants/hosts';

export const START_LIVE_ACTIVITY = 'start_live_activity';
export const DISCARD_LIVE_ACTIVITY = 'discard_live_activity';
export const FETCH_LIVE_ACTIVITY = 'fetch_live_activity';
export const LIVE_ACTIVITY_NEXT_STEP = 'live_activity_next_step';
export const LIVE_ACTIVITY_START_TIMER = 'live_activity_start_timer';

export function fetchLiveActivity() {
  const request = axios
    .get(`${ROOT_URL}/activity/live/`, {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
    });

  return {
    type: FETCH_LIVE_ACTIVITY,
    payload: request,
  };
}

export function discardLiveActivity(id, callback) {
  // eslint-disable-next-line
  const request = axios
    .delete(`${ROOT_URL}/activity/live/`, {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
    })
    .then(() => callback());

  return {
    type: DISCARD_LIVE_ACTIVITY,
    payload: id,
  };
}


export function startLiveActivity(recipeId, callback) {

  const payload = { recipe: Number(recipeId) };

  const request = axios
    .post(`${ROOT_URL}/activity/live/start/`, payload, {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
    })
    .then(() => callback());

  return {
    type: START_LIVE_ACTIVITY,
    payload: request,
  };
}

export function liveActivityNextStep() {
  const payload = {};

  const request = axios
    .post(`${ROOT_URL}/activity/live/next_step/`, payload, {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
    });

  return {
    type: LIVE_ACTIVITY_NEXT_STEP,
    payload: request,
  };
}

export function liveActivityStartTimer() {
  const payload = {};

  const request = axios
    .post(`${ROOT_URL}/activity/live/start_timer/`, payload, {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
    });

  return {
    type: LIVE_ACTIVITY_START_TIMER,
    payload: request,
  };
}
