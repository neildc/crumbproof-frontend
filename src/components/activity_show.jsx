
import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchActivity, deleteActivity } from "../actions";
import LinearProgress from 'material-ui/LinearProgress';
import RaisedButton from 'material-ui/RaisedButton';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import {Card, CardMedia, CardTitle} from 'material-ui/Card';
import moment from "moment";


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

    var duration = null;

    if (activity.completed && activity.started) {
      duration = moment(activity.completed).diff(moment(activity.started), 'hours');
    }

    if (!activity) {
      return <LinearProgress mode="indeterminate" />;
    }

    return (
      <Card >

      <CardMedia overlay={
        <CardTitle
          title={activity.name}
          subtitle={`By ${activity.user_id}`}
        />
      }
        style={{padding:"5px"}}>
          <img src={activity.crumb_shot} alt=""/>
        </CardMedia>
        <div style={{padding:"30px"}}>
          <RaisedButton
            label="Delete Activity"
            icon={<DeleteIcon/>}
            backgroundColor={"red"}
            labelColor={"white"}
            onClick={this.onDeleteClick.bind(this)}
            style={{float: "right"}}
      />

          {activity.oven_start && activity.oven_end &&
            <p>In the oven: {moment(activity.oven_start).format('h:mm:ss a')} {" - "}
                            {moment(activity.oven_end).format('h:mm:ss a')}
            </p>
          }

          { activity.completed &&
            <p>Completed: {activity.completed}</p>
          }

          { duration &&
            <p>Total duration: {duration} hours</p>
          }

          { activity.notes &&
            <p>Notes for next time: {activity.notes}</p>
          }

        </div>
      </Card>
    );
  }
}

function mapStateToProps({ activities }, ownProps) {
  return { activity: activities[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchActivity, deleteActivity })(ActivityShow);
