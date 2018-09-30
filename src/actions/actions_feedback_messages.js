export const CLEAR_FEEDBACK_MESSAGE = "CLEAR_FEEDBACK_MESSAGE";

export function clearMessage(src) {
  return {
    type: CLEAR_FEEDBACK_MESSAGE,
    payload: src
  };
}
