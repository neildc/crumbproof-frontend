import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import { SectionsContainer, Section, Footer } from 'react-fullpage';
import LoadingCard from './loading_card';

import {
  askPushNotificationsPermission,
  subscribeUserToPush,
} from '../util/web_push';

import './live_activity.css';

import {
  fetchLiveActivity,
} from '../actions/actions_live_activity';

import LiveActivityControl from './live_activity_control';


const fullPageOptions = {
  activeClass: 'active', // the class that is appended to the sections links
  anchors: [], // the anchors for each sections
  arrowNavigation: true, // use arrow keys
  className: 'SectionContainer', // the class name for the section container
  delay: 300, // the scroll animation speed
  navigation: true, // use dots navigatio
  scrollBar: false, // use the browser default scrollbar
  sectionPaddingTop: '0', // the section top padding
  sectionPaddingBottom: '0', // the section bottom padding
  verticalAlign: false, // align the content of each section vertical
  sectionClassName: 'section',
};

class LiveActivity extends Component {
  constructor() {
    super();
    this.state = {
      firstLoad: true,
    };
  }

  componentDidMount() {
    if (this.props.user) {
      askPushNotificationsPermission();
      subscribeUserToPush();
    }

    if (!this.props.liveActivity.current_step) {
      this.props.fetchLiveActivity();
    }
  }

  componentDidUpdate() {
    const { current_step } = this.props.liveActivity;

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
    }
    return {};
  }

  endTime(instruction) {
    if (this.props.liveActivity.end_times[instruction.id]) {
      const endTime = moment(this.props.liveActivity.end_times[instruction.id]).calendar();
      return `Completed ${endTime}`;
    }
    return null;
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

    return (
      <div>
        <Footer>
          <LiveActivityControl
            liveActivity={this.props.liveActivity}
            currentStepInAnchor={Number(window.location.hash.substr(5))}
            history={this.props.history}
          />
        </Footer>

        <SectionsContainer {...fullPageOptions}>
          {this.renderSteps(recipe.data.instructions)}
        </SectionsContainer>
      </div>
    );
  }
}

function mapStateToProps({ liveActivity, user }) {
  return {
    liveActivity,
    user,
  };
}

export default connect(
  mapStateToProps,
  { fetchLiveActivity },
)(LiveActivity);
