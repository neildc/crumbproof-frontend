import _ from 'lodash';
import { createSelector } from 'reselect';
import { NO_MSG, ERROR_MSG, NORMAL_MSG } from '../constants/feedback_message_types';

const errorMessageSelector = (state) => {
  const store = _.findKey(state, 'error');

  if (!store) { return null; }

  return {
    src: store,
    text: state[store].error,
    type: ERROR_MSG,
  };
};

const normalMessageSelector = (state) => {
  const store = _.findKey(state, 'message');

  if (!store) { return null; }

  return {
    src: store,
    text: state[store].message,
    type: NORMAL_MSG,
  };
};

const getMessage = (error, message) => {
  // TODO: Combine

  if (error) { return error; }
  if (message) { return message; }

  return { text: '', type: NO_MSG, src: null };
};

export default createSelector(
  errorMessageSelector,
  normalMessageSelector,
  getMessage,
);
