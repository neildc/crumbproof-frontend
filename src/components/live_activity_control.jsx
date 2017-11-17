import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Card } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import ReplayIcon from 'material-ui/svg-icons/av/replay';
import Divider from 'material-ui/Divider';
import Countdown, { zeroPad } from 'react-countdown-now';

import {
  liveActivityNextStep,
  liveActivityStartTimer,
} from '../actions/actions_live_activity';

import Tooltip from './tooltip';
import { minToHandM } from '../util/time';
import { FadeIn } from './animations/fade';

import './live_activity_control.css';

class LiveActivityControl extends Component {
  isLastStep(instructions) {
    const numSteps = instructions.length;
    return (this.props.liveActivity.current_step + 1 >= numSteps);
  }

  handleNextClick(recipe) {
    if (this.isLastStep(recipe.data.instructions)) {
      this.props.history.push(`/activity/new/recipe/${recipe.id}`);
    } else {
      this.props.liveActivityNextStep();
    }
  }

  renderTimerStart(instruction) {
    const { hours, minutes } = minToHandM(instruction.time_gap_to_next);

    const h = zeroPad(hours);
    const m = zeroPad(minutes);

    return (
      <div>
        <FlatButton
          fullWidth
          label="Start timer"
          onClick={this.props.liveActivityStartTimer}
        />
        <div className="timer">
          {`${h}:${m}:00`}
        </div>
      </div>
    );
  }

  renderTimer(instruction) {
    const startTime = this.props.liveActivity.start_times[instruction.id];

    if (!startTime) {
      return this.renderTimerStart(instruction);
    }

    const renderer = ({
      hours,
      minutes,
      seconds,
      completed,
    }) => {
      if (completed) {
        return 'Completed';
      }

      const h = zeroPad(hours);
      const m = zeroPad(minutes);
      const s = zeroPad(seconds);

      return <span>{h}:{m}:{s}</span>;
    };

    return (
      <div className="timer">
        <Countdown
          date={Date.parse(startTime) + (instruction.time_gap_to_next * 60 * 1000)}
          renderer={renderer}
        />
      </div>
    );
  }

  render() {
    const { recipe } = this.props.liveActivity;
    const currStep = this.props.liveActivity.current_step;
    const { instructions } = recipe.data;

    const currentStepInAnchor = Number(window.location.hash.substr(5)); //remove #step

    return (
      <Card className="liveController">
        { instructions[currStep].time_gap_to_next &&
          <FadeIn>

            <div className="timerContainer">
              <Tooltip
                className="tooltip"
                content={[
                  'This timer is running remotely, you may close this page if you want.\n',
                  'The push notification for this timer may be early/late by at most 1 minute']}
              >
                {this.renderTimer(instructions[currStep])}
                <Divider className="timerDivider" />
              </Tooltip>
            </div>

          </FadeIn>
        }

        <div className="pageControls">
          <Tooltip
            className="tooltip"
            content="Feel free to scroll through the steps, only the next button actually changes your current step"
          >
            <FlatButton
              label={`Return to current step: ${currStep + 1}`}
              labelStyle={{ fontSize: '22px', fontWeight: 400 }}
              href={`#step${currStep + 1}`}
              disabled={currentStepInAnchor === currStep + 1}
              icon={<ReplayIcon />}
            />
          </Tooltip>

          <RaisedButton
            primary
            className="nextStepButton"
            label={this.isLastStep(instructions) ? 'Submit Activity' : 'Next'}
            labelStyle={{ verticalAlign: 'middle' }}
            href={`#step${currStep + 2}`}
            onClick={() => this.handleNextClick(recipe)}
            fullWidth={window.innerWidth <= 640}
          />
        </div>
      </Card>
    );
  }
}

LiveActivityControl.propTypes = {
  liveActivity: PropTypes.object.required,
  history: PropTypes.object.required,
}


export default connect(
  null,
  { liveActivityNextStep, liveActivityStartTimer },
)(LiveActivityControl);