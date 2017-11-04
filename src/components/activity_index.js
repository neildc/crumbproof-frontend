import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchActivities, fetchMoreActivities } from "../actions/actions_activity";
import FloatingActionButton from "./floating_action_button";
import ContentAdd from 'material-ui/svg-icons/content/add';
import LinearProgress from 'material-ui/LinearProgress';
import ActivityCard from "./activity_card";
import InfiniteScroll from 'react-infinite-scroller';
import { Card } from 'material-ui/Card';
import { SlideInBottom } from './animations/slide';


class ActivityIndex extends Component {
  componentDidMount() {
    this.props.fetchActivities();
  }

  renderActivityCards() {

    // Need to _.values as activities is an object
    if (_.values(this.props.activities.byId).length === 0) {
      return <LinearProgress mode="indeterminate" />;
    }

    let activities = _.orderBy(this.props.activities.byId, ['created'], ['desc']);

    return _.map(activities, activity => {
      return (
            <SlideInBottom>
              <div key={activity.id} style={{marginBottom:"50px"}}>
                <ActivityCard activity={activity}/>
              </div>
            </SlideInBottom>
      )
    })
  }

  loadMoreActivities() {
    if (this.props.activities.next) {
      this.props.fetchMoreActivities(this.props.activities.next);
    }
  }

  render() {

    return (
      <div>
        <FloatingActionButton link="/activity/new">
            <ContentAdd/>
        </FloatingActionButton>

        <InfiniteScroll
          pageStart={0}
          loadMore={this.loadMoreActivities.bind(this)}
          hasMore={this.props.activities.next}
          loader={
            <Card style={{padding:"20px", marginBottom:"30px"}}>
              <LinearProgress mode="indeterminate" />
            </Card>
          }
        >
          {this.renderActivityCards()}
        </InfiniteScroll>

      </div>
    );
  }
}

function mapStateToProps(state) {
  return { activities: state.activities };
}

export default connect(mapStateToProps, { fetchActivities, fetchMoreActivities })(ActivityIndex);
