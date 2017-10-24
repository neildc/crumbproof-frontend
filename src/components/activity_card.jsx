import React from "react";
import { Link } from "react-router-dom";
import LinearProgress from 'material-ui/LinearProgress';
import {Card, CardMedia, CardTitle} from 'material-ui/Card';
import moment from "moment";

export default function ActivityCard(props) {

  const { activity } = props;

  if (!activity) {
    return <LinearProgress mode="indeterminate" />;
  }

  var duration = null;

  if (activity.completed && activity.started) {
    duration = moment(activity.completed).diff(moment(activity.started), 'hours');
  }

  const created = moment(activity.created).fromNow();

  return (
    <Card >

      <CardMedia overlay={
        <CardTitle
          title={activity.name}
                subtitle={`${created} by ${activity.user}`}
        />
      }>
        <img src={activity.crumb_shot} alt=""/>
      </CardMedia>

      <div style={{padding:"30px"}}>
        { activity.recipe &&
          <div>
            <b>Recipe Used:</b> <Link to={`/recipes/${activity.recipe}`}>{activity.recipe_name}</Link>
          </div>
        }

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
