import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import ContentAdd from 'material-ui/svg-icons/content/add';

import { fetchActivities, fetchMoreActivities } from '../actions/actions_activity';

import FloatingActionButton from './floating_action_button';
import ActivityCard from './activity_card';
import ActivityCardPlaceholder from './activity_card_placeholder';
import { SlideInBottom } from './animations/slide';
import { FadeIn } from './animations/fade';

export class ActivityIndex extends Component {
  loadMoreActivities() {
    if (this.props.activities.next) {
      this.props.fetchMoreActivities(this.props.activities.next);
    }
  }

  renderActivityCards() {
    const ActivityCardPadded = ({ activity }) => (
      <div style={{ marginBottom: '50px' }}>
        <ActivityCard activity={activity} />
      </div>
    );

    const activities = _.orderBy(this.props.activities.byId, ['created'], ['desc']);
    const firstActivity = _.head(activities);

    /*
     * Only animate the first activity, otherwise the slide in is quite laggy
     */
    const head = (
      <FadeIn key={firstActivity.id}>
        <ActivityCardPadded activity={firstActivity} />
      </FadeIn>
    );
    const tail = _.map(_.tail(activities), activity => (
      <ActivityCardPadded activity={activity} key={activity.id} />
    ));

    return _.concat(head, tail);
  }

  render() {
    return (
      <div>
        <FloatingActionButton link="/activity/new">
          <ContentAdd />
        </FloatingActionButton>

        {(_.values(this.props.activities.byId).length === 0) ?
            <SlideInBottom onRest={() => this.props.fetchActivities()} >
              <ActivityCardPlaceholder />
            </SlideInBottom>
          :
            <InfiniteScroll
              pageStart={0}
              loadMore={this.loadMoreActivities.bind(this)}
              hasMore={this.props.activities.next != null}
              loader={<ActivityCardPlaceholder />}
            >
              {this.renderActivityCards()}
            </InfiniteScroll>
        }

      </div>
    );
  }
}

function mapStateToProps(state) {
  return { activities: state.activities };
}

export default connect(mapStateToProps, { fetchActivities, fetchMoreActivities })(ActivityIndex);
