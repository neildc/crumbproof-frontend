import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchActivities } from "../actions/actions_activity";
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import CPCard from './crumbproof_card.jsx';
import { GridTile } from 'material-ui/GridList';
import LinearProgress from 'material-ui/LinearProgress';
import './activity_index.css';


class ActivityIndex extends Component {
  componentDidMount() {
    this.props.fetchActivities();
  }

  renderActivityTiles() {

    // Need to _.values as activities is an object
    if (_.values(this.props.activities).length === 0) {
      return <LinearProgress mode="indeterminate" />;
    }

    return _.map(this.props.activities, activity => {
      return (
        <GridTile
          className="galleryTile"
          key={activity.id}
          title={activity.name}
          subtitle={<span>by <b>{activity.user}</b></span>}
          containerElement={
            <Link to={`/activity/${activity.id}`} />
          }
        >
          <img src={activity.crumb_shot} alt="" />
        </GridTile>
      );
    });
  }

  render() {

    return (
        <CPCard title="Activities">
            <div className="galleryGrid" >
              {this.renderActivityTiles()}
            </div>
            <div style={{float:"right"}}>
                <FloatingActionButton containerElement={<Link to="/activity/new"/>}>
                    <ContentAdd/>
                </FloatingActionButton>
            </div>
        </CPCard>
    );
  }
}

function mapStateToProps(state) {
  return { activities: state.activities };
}

export default connect(mapStateToProps, { fetchActivities })(ActivityIndex);
