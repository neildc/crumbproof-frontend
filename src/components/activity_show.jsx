import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchActivity, deleteActivity } from "../actions/actions_activity";
import ActivityCard from "./activity_card";
import RaisedButton from 'material-ui/RaisedButton';
import DeleteIcon from 'material-ui/svg-icons/action/delete';

class ActivityShow extends Component {

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchActivity(id);
  }

  onDeleteClick() {
    const { id } = this.props.match.params;

    this.props.deleteActivity(id, () => {
      this.props.history.push("/activity");
    });
  }

  render() {

    const { activity, user } = this.props;

    return(
      <div>
        <ActivityCard activity={activity}/>
        {(activity && user === activity.user) &&
          <RaisedButton
            label="Delete Activity"
            icon={<DeleteIcon/>}
            backgroundColor={"red"}
            labelColor={"white"}
            onClick={this.onDeleteClick.bind(this)}
            style={{float: "right"}}
          />
        }
      </div>
    );
  }
}

function mapStateToProps({ activities, auth }, ownProps) {

  const getActivity = () => {
    if (activities.byId && activities.byId[ownProps.match.params.id]) {
      return activities.byId[ownProps.match.params.id]
    } else {
      return null
    }
  }

  return {
    activity: getActivity(),
    user: auth.user
  };
}

export default connect(mapStateToProps, { fetchActivity, deleteActivity })(ActivityShow);
