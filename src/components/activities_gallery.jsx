import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { GridTile } from 'material-ui/GridList';
import LinearProgress from 'material-ui/LinearProgress';

import './gallery.css';

const NUM_TO_SHOW = 2;

class ActivitiesGallery extends Component {
  renderActivityTiles(activities) {
    const mostRecentActivities = _.sortBy(activities, 'created')
      .reverse()
      .slice(0, NUM_TO_SHOW);

    return _.map(mostRecentActivities, (activity) => {
      const created = moment(activity.created).fromNow();

      return (
        <GridTile
          className="galleryTile"
          key={activity.id}
          title={activity.name}
          subtitle={<span>{created} by <b>{activity.user}</b></span>}
          containerElement={
            <Link to={`/activity/${activity.id}`} />
          }
        >
          <img src={`https://crumbproof-img.s3.amazonaws.com/media/${activity.crumbShot}`} alt="" />
        </GridTile>
      );
    });
  }

  renderHeader(length) {
    if (length > 0) {
      return (`${length} total activities`);
    }

    return ('Be the first to record an activity with this recipe!');
  }

  render() {
    if (this.props.data.loading) {
      return <LinearProgress mode="indeterminate" />;
    }

    const { activities } = this.props.data.recipe;

    return (
      <div>
        {this.renderHeader(activities.length)}
        <div className="galleryGrid" >
          {this.renderActivityTiles(activities)}
        </div>
      </div>
    );
  }
}

ActivitiesGallery.proptypes = {
  recipeId: PropTypes.number.required,
  data: PropTypes.object.required,
};

const GET_RECIPE_ACTIVITIES = gql`
  query getRecipeActivities($id: Int!) {
    recipe (id: $id) {
      activities {
        id
        name
        crumbShot
      }
    }
  }
`;

export default graphql(GET_RECIPE_ACTIVITIES, {
  options: ({ recipeId }) => ({ variables: { id: recipeId } }),
})(ActivitiesGallery);
