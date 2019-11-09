import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Card } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import ReplayIcon from 'material-ui/svg-icons/av/replay';
import Divider from 'material-ui/Divider';
import Countdown, { zeroPad } from 'react-countdown-now';

import {
  liveActivityNextStep,
  liveActivityStartTimer,
} from '../actions/actions_live_activity';

import Tooltip from './tooltip';
import SubmitButton from './submit_button';

import { minToHandM } from '../util/time';
import { FadeIn } from './animations/fade';

import './live_activity_control.css';

const isLastStep = (instructions, currStep) => {
  const numSteps = instructions.length;
  return (currStep + 1 >= numSteps);
}

const PageControls = ({currentStepInAnchor, currStep, movingToNextStep, instructions, recipe, nextClickHandler}) => (
  <div className="pageControls">
    <Tooltip
      className="tooltip"
      content="Feel free to scroll through the steps, only the next button actually changes your current step"
    >
      <FlatButton
        label={window.innerWidth < 640 ?
               `Step #${currStep + 1}` :
               `Return to current step: ${currStep + 1}`}

        labelStyle={{ fontSize: '22px', fontWeight: 400 }}
        href={`#step${currStep + 1}`}
        disabled={currentStepInAnchor === currStep + 1}
        icon={<ReplayIcon />}
      />
    </Tooltip>

    <SubmitButton
      className="nextStepButton"
      submittingFlag={movingToNextStep}
      label={isLastStep(instructions, currStep) ? 'Submit Activity' : 'Next'}
      labelInProgress={isLastStep(instructions, currStep) ? 'Submit Activity' : 'Saving...'}
      labelStyle={{ verticalAlign: 'middle' }}
      href={`#step${currStep + 2}`}
      onClick={nextClickHandler}
      fullWidth={window.innerWidth <= 640}
    />
  </div>
)

const Timer = ({ currStepInstruction, currStepStartTime, started, isSubmitting, startTimerHandler }) => (
  <FadeIn>
    <div className="timerContainer">
      <Tooltip
        className="tooltip"
        content={[
            'This timer is running remotely, you may close this page if you want.\n'
            //, 'The push notification for this timer may be early/late by at most 1 minute'
        ]}
      >
        {currStepStartTime ?
          <CountdownText
            instruction={currStepInstruction}
            startTime={currStepStartTime}
          />
          :
          <TimerStarter
            instruction={currStepInstruction}
            hasSubmitted={isSubmitting}
            startTimerHandler={startTimerHandler}
          />
        }
        <Divider className="timerDivider" />
      </Tooltip>
    </div>
  </FadeIn>
)


const CountdownText = ({instruction, startTime}) => {
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
    <div className="countdown">
      <Countdown
        date={Date.parse(startTime) + (instruction.time_gap_to_next * 60 * 1000)}
        renderer={renderer}
      />
    </div>
  )
}


const TimerStarter = ({instruction, hasSubmitted, startTimerHandler}) => {
  const { hours, minutes } = minToHandM(instruction.time_gap_to_next);

  const h = zeroPad(hours);
  const m = zeroPad(minutes);

  return (
    <div>
      <SubmitButton
        fullWidth
        flat
        label="Start timer"
        labelInProgress="Starting timer..."
        submittingFlag={hasSubmitted}
        onClick={startTimerHandler}
      />
      <div className="timer">
        {`${h}:${m}:00`}
      </div>
    </div>
  )
}

class LiveActivityControl extends Component {
  constructor() {
    super();
    this.state = {
      movingToNextStep: false,
      startingTimer: false,
    };
    this.handleNextClick.bind(this);
    this.handleStartTimerClick.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    const prevStep = prevProps.liveActivity.current_step;
    const currStep = this.props.liveActivity.current_step;

    if (this.state.movingToNextStep && prevStep !== currStep) {
      this.setState({ movingToNextStep: false });
    }

    if (this.state.startingTimer) {
      const prevNumStartTimes = Object.keys(prevProps.liveActivity.start_times).length;
      const currNumStartTimes = Object.keys(this.props.liveActivity.start_times).length;

      if (prevNumStartTimes < currNumStartTimes) {
        this.setState({ startingTimer: false });
      }
    }
  }

  handleNextClick(recipe, currStep) {
    if (isLastStep(recipe.data.instructions, currStep)) {
      this.props.history.push(`/activity/new/recipe/${recipe.id}`);
    } else {
      this.props.liveActivityNextStep();
      this.setState({ movingToNextStep: true, startingTimer: false });
    }
  }

  handleStartTimerClick() {
    this.props.liveActivityStartTimer();
    this.setState({ startingTimer: true });
  }

  render() {
    const { recipe } = this.props.liveActivity;
    const { instructions } = recipe.data;
    const currStep = this.props.liveActivity.current_step;
    const currStepInstruction = instructions[currStep];
    const currStepStartTime = this.props.liveActivity.start_times[currStepInstruction.id];

    return (
      <Card className="liveController">

        { currStepInstruction.time_gap_to_next &&
          <Timer
            currStepInstruction={currStepInstruction}
            currStepStartTime={currStepStartTime}
            isSubmitting={this.state.startingTimer}
            startTimerHandler={() => this.handleStartTimerClick()}
          />
        }

        <PageControls
          currentStepInAnchor={this.props.currentStepInAnchor}
          currStep
          movingToNextStep={this.state.movingToNextStep}
          instructions
          recipe
          nextClickHandler={() => this.handleNextClick(recipe, currStep)}
        />

      </Card>
    );
  }
}

LiveActivityControl.propTypes = {
  liveActivity: PropTypes.object.required,
  currentStepInAnchor: PropTypes.number,
  history: PropTypes.object.required,
};


export default connect(
  null,
  { liveActivityNextStep, liveActivityStartTimer },
)(LiveActivityControl);
