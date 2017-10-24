import axios from "axios";
import { ROOT_URL } from "../constants/hosts";

export const FETCH_ACTIVITIES = "fetch_activities";
export const FETCH_ACTIVITY = "fetch_activity";
export const CREATE_ACTIVITY = "create_activity";
export const DELETE_ACTIVITY = "delete_activity";

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
