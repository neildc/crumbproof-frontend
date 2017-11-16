import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import { SectionsContainer, Section, Footer } from 'react-fullpage';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import ReplayIcon from 'material-ui/svg-icons/av/replay';
import Divider from 'material-ui/Divider';
import Countdown, { zeroPad } from 'react-countdown-now';
import Tooltip from './tooltip';
import LoadingCard from './loading_card';
import { minToHandM } from '../util/time';

import { FadeIn } from './animations/fade';

import {
  askPushNotificationsPermission,
  subscribeUserToPush,
} from '../util/web_push';

import './live_activity.css';

import {
  fetchLiveActivity,
  liveActivityNextStep,
  liveActivityStartTimer,
} from '../actions/actions_live_activity';


const fullPageOptions = {
  activeClass:          'active', // the class that is appended to the sections links
  anchors:              [], // the anchors for each sections
  arrowNavigation:      true, // use arrow keys
  className:            'SectionContainer', // the class name for the section container
  delay:                300, // the scroll animation speed
  navigation:           true, // use dots navigatio
  scrollBar:            false, // use the browser default scrollbar
  sectionPaddingTop:    '0', // the section top padding
  sectionPaddingBottom: '0', // the section bottom padding
  verticalAlign:        false, // align the content of each section vertical
  sectionClassName:     'section'
};

class LiveActivity extends Component {
  constructor() {
    super();
    this.state = {
      firstLoad: true,
    };
  }

  componentDidMount() {
    askPushNotificationsPermission();
    subscribeUserToPush();

    if (!this.props.liveActivity.current_step) {
      this.props.fetchLiveActivity();
    }
  }

  componentDidUpdate() {
    const { current_step } = this.props.liveActivity

    // Scroll the user down their current step when they load the page
    if (current_step && this.state.firstLoad) {
      this.setState({ firstLoad: false });

      // The hack below fails if the user navigates to /live#${current_step}
      // Since the click doesn't navigate when current == target
      if (window.location.hash) {
        document.getElementsByClassName('Navigation-Anchor')[0].click();
      }

      setTimeout(() => {
        document.getElementsByClassName('Navigation-Anchor')[current_step].click();
      }, 500);
    }
  }


  crossOutStep(instruction) {
    if (this.props.liveActivity.end_times[instruction.id]) {
      return { textDecoration: 'line-through', color: 'grey' };
    } else {
      return {};
    }
  }

  endTime(instruction) {
    if (this.props.liveActivity.end_times[instruction.id]) {
      const endTime = moment(this.props.liveActivity.end_times[instruction.id]).calendar();
      return `Completed ${endTime}`;
    }
    return null;
  }

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

  renderTimer(instruction) {
    const startTime = this.props.liveActivity.start_times[instruction.id];

    if (!startTime) {
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

    const renderer = ({ hours, minutes, seconds, completed }) => {
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

  renderSteps(instructions) {
    return _.map(instructions, (instruction, index) =>
      (
        <Section key={instruction.id}>
          <Card className="stepCard">
            <CardTitle
              title={`Step #${index + 1}`}
              titleStyle={this.crossOutStep(instruction)}
              subtitle={this.endTime(instruction)}
            />

            <CardText >
              {instruction.content} {instruction.time_gap_to_next && `for ${instruction.time_gap_to_next} minutes`}
            </CardText>

          </Card>
        </Section>
      ));
  }


  render() {
    const { recipe } = this.props.liveActivity;

    if (!recipe) {
      return <LoadingCard />;
    }

    fullPageOptions.anchors = _.map(
      recipe.data.instructions,
      (i, index) => `step${index + 1}`,
    );

    const currStep = this.props.liveActivity.current_step;
    const { instructions } = recipe.data;

    const currentStepInAnchor = Number(window.location.hash.substr(5)); //remove #step

    return (
      <div>
        <Footer>
          <Card className="liveController">
            { instructions[currStep].time_gap_to_next &&
              <FadeIn>

                <div className="timerContainer">
                  <Tooltip
                    className="tooltip"
                    content={[
                      "This timer is running remotely, you may close this page if you want.\n",
                      " \n ",
                      "The push notification for this timer may be early/late by at most 1 minute"]}
                  >

                    {this.renderTimer(instructions[currStep])}
                    <Divider className="timerDivider"/>
                  </Tooltip>
                </div>

              </FadeIn>
            }

            <div className="pageControls">

              <Tooltip className="tooltip" content="Feel free to scroll through the steps, only the next button actually changes your current step">
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
                labelStyle={{verticalAlign: "middle"}}
                href={`#step${currStep + 2}`}
                onClick={() => this.handleNextClick(recipe)}
                fullWidth={window.innerWidth <= 640}
              />
            </div>
          </Card>
        </Footer>

        <SectionsContainer {...fullPageOptions}>
          {this.renderSteps(instructions)}
        </SectionsContainer>
      </div>

    );
  }
}

function mapStateToProps({ liveActivity }) {
  return {
    liveActivity,
  };
}

export default connect(
  mapStateToProps,
  { fetchLiveActivity, liveActivityNextStep, liveActivityStartTimer },
)(LiveActivity);
