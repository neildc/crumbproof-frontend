import _ from "lodash";
import "./gallery.css";
import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchRecipeActivities } from "../actions/actions_recipe";
import { GridTile } from 'material-ui/GridList';
import LinearProgress from 'material-ui/LinearProgress';
import moment from "moment";

const NUM_TO_SHOW = 2;

class ActivitiesGallery extends Component {
  componentDidMount() {
    this.props.fetchRecipeActivities(this.props.recipeId);
  }

  renderActivityTiles() {

    if (this.props.loading) {
      return <LinearProgress mode="indeterminate" />;
    }

    return _.map(this.props.activities.slice(0, NUM_TO_SHOW), activity => {

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
          <img src={activity.crumb_shot} alt="" />
        </GridTile>
      );
    });
  }

  renderHeader() {

    if (this.props.loading) {
      return ("");
    }

    if (this.props.activities.length > 0) {
      return (`${this.props.activities.length} total activities`);
    } else {
      return( "Be the first to record an activity with this recipe!");
    }
  }

  render() {
    return (
      <div>
        {this.renderHeader()}
        <div className="galleryGrid" >
          {this.renderActivityTiles()}
        </div>
      </div>
    );
  }
}

ActivitiesGallery.proptypes = {
  recipeId: PropTypes.number.required
}

function mapStateToProps(state, ownProps) {

  let activityHistory = state.recipes[ownProps.recipeId].activity_history;

  return {
    activities : _.filter(state.activities, {recipe: ownProps.recipeId}),
    // undefined if its still loading, otherwise activityHistory should be
    // an array(possibly empty) once the fetchRecipeActivities action is complete
    loading: !activityHistory
  };
}

export default connect(mapStateToProps, { fetchRecipeActivities })(ActivitiesGallery);
