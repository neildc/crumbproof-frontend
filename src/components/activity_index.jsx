import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroller";
import ContentAdd from "material-ui/svg-icons/content/add";

import {
  fetchActivities,
  fetchMoreActivities
} from "../actions/actions_activity";

import FloatingActionButton from "./floating_action_button";
import ActivityCard from "./activity_card";
import ActivityCardPlaceholder from "./activity_card_placeholder";
import { SlideInBottom } from "./animations/slide";

import { Card } from 'material-ui/Card';

export class ActivityIndex extends Component {
  constructor(props) {
    super(props);
    this.loadMoreActivities = this.loadMoreActivities.bind(this);
  }

  loadMoreActivities() {
    if (this.props.activities.next) {
      this.props.fetchMoreActivities(this.props.activities.next);
    }
  }

  renderActivityCard(activity) {
    return (
      <ActivityCard
        activity={activity}
        style={{ marginBottom: "50px" }}
        key={activity.id}
      />
    );
  }

  renderActivityCards() {
    const activities = _.orderBy(
      this.props.activities.byId,
      ["created"],
      ["desc"]
    );

    return _.map(activities, activity => this.renderActivityCard(activity));
  }

  render() {
    return (
      <div>
        <FloatingActionButton link="/activity/new">
          <ContentAdd />
        </FloatingActionButton>

        {_.values(this.props.activities.byId).length === 0 ? (
          this.props.activities.next ? (
              <Card style={{ height: '400px', padding: '50px', paddingTop : '120px' }}>
                <h1> You have no activities, please visit recipes to record one</h1>
              </Card>
          ) : (
            <SlideInBottom onRest={() => this.props.fetchActivities()}>
              <ActivityCardPlaceholder animate />
            </SlideInBottom>
          )
        ) : (
          <InfiniteScroll
            pageStart={0}
            threshold={750}
            loadMore={this.loadMoreActivities}
            hasMore={this.props.activities.next != null}
            loader={<ActivityCardPlaceholder animate/>}
          >
            {this.renderActivityCards()}
          </InfiniteScroll>
        )}
      </div>
    );
  }
}

function mapStateToProps({ activities, auth }) {
  if (auth.contentVisibilityUserOnly) {
    const ret = {
      activities: {
        ...activities,
        byId: _.filter(activities.byId, { user: auth.user })
      }
    };
    return ret;
  } else {
    return { activities };
  }
}

export default connect(
  mapStateToProps,
  { fetchActivities, fetchMoreActivities }
)(ActivityIndex);
