import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchActivity } from '../actions/actions_activity';
import ActivityCard from './activity_card';

class ActivityShow extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchActivity(id);
  }

  render() {
    return (
      <div>
        <ActivityCard activity={this.props.activity} />
      </div>
    );
  }
}

function mapStateToProps({ activities }, ownProps) {
  const getActivity = () => {
    if (activities.byId && activities.byId[ownProps.match.params.id]) {
      return activities.byId[ownProps.match.params.id];
    }
    return null;
  };

  return {
    activity: getActivity(),
  };
}

export default connect(mapStateToProps, { fetchActivity })(ActivityShow);
