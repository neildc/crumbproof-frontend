import React, { Component } from 'react';
import { connect } from 'react-redux';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import {
  fetchLiveActivity,
  startLiveActivity,
  discardLiveActivity,
} from '../actions/actions_live_activity';
import LoadingCard from './loading_card';

class LiveActivityStart extends Component {
  componentDidMount() {
    this.props.fetchLiveActivity();
  }

  componentDidUpdate() {
    if (!this.props.liveActivity.id) {
      this.startAndNavigateToLive();
    }
  }

  startAndNavigateToLive() {
    const { recipeId } = this.props.match.params;
    if (recipeId) {
      this.props.startLiveActivity(
        recipeId,
        () => this.props.history.push('/live'),
      );
    }
  }

  handleDiscardAndContinue() {
    const { id } = this.props.liveActivity;

    this.props.discardLiveActivity(id, () => {
      this.startAndNavigateToLive();
    });
  }

  renderExistingLiveActivityPrompt() {
    const actions = [
      <FlatButton
        label="Cancel"
        onClick={() => this.props.history.goBack()}
      />,
      <FlatButton
        label="View existing"
        onClick={() => this.props.history.push('/live')}
      />,
      <RaisedButton
        primary
        label="Discard and continue"
        onClick={this.handleDiscardAndContinue.bind(this)}
      />,
    ];

    return (
      <div>
        <Dialog
          open
          actions={actions}
          modal={false}
        >
          Warning: you have an existing live activity
        </Dialog>
      </div>
    );
  }


  render() {
    if (this.props.liveActivity.recipe) {
      return this.renderExistingLiveActivityPrompt();
    }

    return <LoadingCard />;
  }
}

function mapStateToProps({ liveActivity }) {
  return { liveActivity };
}

export default connect(
  mapStateToProps,
  { fetchLiveActivity, startLiveActivity, discardLiveActivity },
)(LiveActivityStart);
