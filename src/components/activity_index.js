import "./floating_add_button.css";
import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchActivities, fetchMoreActivities } from "../actions/actions_activity";
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import LinearProgress from 'material-ui/LinearProgress';
import ActivityCard from "./activity_card";
import InfiniteScroll from 'react-infinite-scroller';
import { Card } from 'material-ui/Card';


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
        <div key={activity.id} style={{marginBottom:"50px"}}>
          <ActivityCard activity={activity}/>
        </div>
      );
    });
  }

  loadMoreActivities() {
    if (this.props.activities.next) {
      this.props.fetchMoreActivities(this.props.activities.next);
    }
  }

  render() {

    return (
      <div>
        <div className="addButton">
          <FloatingActionButton containerElement={<Link to="/activity/new"/>}>
            <ContentAdd/>
          </FloatingActionButton>
        </div>

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
