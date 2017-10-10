import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchActivities } from "../actions";
import {List, ListItem} from 'material-ui/List';
import ContentSend from 'material-ui/svg-icons/content/send';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Subheader from 'material-ui/Subheader';
import CP_Card from './crumbproof_card.jsx';
import LinearProgress from 'material-ui/LinearProgress';
import moment from "moment";


class ActivityIndex extends Component {
  componentDidMount() {
    this.props.fetchActivities();
  }

  renderActivities() {

    return _.map(this.props.activities, activity => {

      const time = moment(activity.started).fromNow();

      return (
        <ListItem
          key={activity.id}
          primaryText={activity.name}
          secondaryText={`By ${activity.user_id}, ${time}`}
          leftIcon={<ContentSend/>}
          containerElement={
            <Link to={`/activity/${activity.id}`} />
          }>
        </ListItem>
      );
    });
  }

  render() {
    return (
        <CP_Card title="Activities">
            <List>
              {this.renderActivities()}
            </List>
            <div style={{float:"right"}}>
                <FloatingActionButton containerElement={<Link to="/activity/new"/>}>
                    <ContentAdd/>
                </FloatingActionButton>
            </div>
        </CP_Card>
    );
  }
}

function mapStateToProps(state) {
  return { activities: state.activities };
}

export default connect(mapStateToProps, { fetchActivities })(ActivityIndex);
