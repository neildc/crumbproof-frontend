import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { forceCheck } from 'react-lazyload';
import InfiniteScroll from 'react-infinite-scroller';
import ContentAdd from 'material-ui/svg-icons/content/add';

import { fetchActivities, fetchMoreActivities } from '../actions/actions_activity';

import FloatingActionButton from './floating_action_button';
import LoadingCard from './loading_card';
import ActivityCard from './activity_card';
import { SlideInBottom } from './animations/slide';


export class ActivityIndex extends Component {
  componentDidMount() {
    this.props.fetchActivities();
  }

  loadMoreActivities() {
    if (this.props.activities.next) {
      this.props.fetchMoreActivities(this.props.activities.next);
    }
  }

  renderActivityCards() {
    // Need to _.values as activities is an object
    if (_.values(this.props.activities.byId).length === 0) {
      return <LoadingCard />;
    }

    const activities = _.orderBy(this.props.activities.byId, ['created'], ['desc']);

    return _.map(activities, activity => (
      <SlideInBottom key={activity.id} onRest={() => forceCheck()}>
        <div style={{ marginBottom: '50px' }}>
          <ActivityCard activity={activity} />
        </div>
      </SlideInBottom>
    ));
  }

  render() {
    return (
      <div>
        <FloatingActionButton link="/activity/new">
          <ContentAdd />
        </FloatingActionButton>

        <InfiniteScroll
          pageStart={0}
          loadMore={this.loadMoreActivities.bind(this)}
          hasMore={this.props.activities.next != null}
          loader={<LoadingCard style={{ marginBottom: '30px' }} />}
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
