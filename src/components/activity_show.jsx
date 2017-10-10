
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchActivity, deleteActivity } from "../actions";
import {
  Step,
  Stepper,
  StepLabel,
  StepContent,
} from 'material-ui/Stepper';
import CP_Card from "./crumbproof_card.jsx";
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
    const { activity } = this.props;

    if (!activity) {
      return <div>Loading...</div>;
    }

    return (
      <CP_Card title={activity.name} titleChildren={<Link to="/activity">Back To Index</Link>}>
        <div>
          <RaisedButton
            label="Delete Activity"
            icon={<DeleteIcon/>}
            backgroundColor={"red"}
            labelColor={"white"}
            onClick={this.onDeleteClick.bind(this)}
            style={{float: "right"}}
          />
          <p>Activity by: {activity.user_id}</p>
          <p>Started on: {activity.started}</p>
          <p>In the oven: {activity.oven_start} - {activity.oven_end}</p>
          <p>Completed: {activity.completed} mins</p>

        </div>
      </CP_Card>
    );
  }
}

function mapStateToProps({ activities }, ownProps) {
  return { activity: activities[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchActivity, deleteActivity })(ActivityShow);
