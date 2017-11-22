import React, { Component } from 'react';
import { connect } from 'react-redux';
import Snackbar from 'material-ui/Snackbar';
import { clearMessage } from '../actions/actions_feedback_messages';
import getMessage from '../selectors/feedback_messages';

import {
  NO_MSG,
  ERROR_MSG,
  NORMAL_MSG,
} from '../constants/feedback_message_types';

class UserFeedbackSnackbar extends Component {
  render() {
    const backgroundColor = {
      [NO_MSG]: 'green',
      [ERROR_MSG]: 'red',
      [NORMAL_MSG]: 'green',
    };

    const { text, type, src } = this.props.message;

    return (
      <Snackbar
        open={type !== NO_MSG}
        message={text}
        autoHideDuration={5000}
        style={{ backgroundColor: backgroundColor[type] }}
        onRequestClose={() => this.props.clearMessage(src)}
      />
    );
  }
}

function mapStateToProps(state) {
  return { message: getMessage(state) };
}

export default connect(mapStateToProps, { clearMessage })(UserFeedbackSnackbar);
