import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LazyLoad from 'react-lazyload';
import moment from 'moment';

import DeleteIcon from 'material-ui/svg-icons/action/delete';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import TripleDotIcon from 'material-ui/svg-icons/navigation/more-horiz';
import { Card, CardMedia, CardTitle } from 'material-ui/Card';

import ImageZoom from 'react-medium-image-zoom';

import { deleteActivity } from '../actions/actions_activity';

import RecipeDiff from './recipe_diff';
import ActivityCardPlaceholder from './activity_card_placeholder';

import './activity_card.css';


export class ActivityCard extends Component {
  handleDeleteClick() {
    this.props.deleteActivity(this.props.activity.id, () => {});
  }

  render() {
    const { activity } = this.props;

    if (!activity) {
      return <ActivityCardPlaceholder />;
    }

    let duration = null;

    if (activity.completed && activity.started) {
      duration = moment(activity.completed).diff(moment(activity.started), 'hours');
    }

    const created = moment(activity.created).fromNow();


    return (
      <Card style={this.props.style} >

        <CardMedia
          className="cardPhoto"
          /*
          *  Without this the overlay captures all click events
          *  instead of the events being handled by the ImageZoom component
          */
          overlayContainerStyle={{ pointerEvents: 'none' }}
          overlay={
            <CardTitle
              title={activity.name}
              subtitle={`${created} by ${activity.user}`}
            />
          }
        >

          <LazyLoad offset={200} once>
            <ImageZoom
              image={{
                src: activity.crumb_shot,
                alt: '',
                className: 'img',
                style: { maxWidth: '100%' },
              }}
            />
          </LazyLoad>
        </CardMedia>

        <div style={{ padding: '30px' }}>

          {(this.props.user === activity.user) &&
            <IconMenu
              iconButtonElement={<IconButton tooltip="Menu"><TripleDotIcon /></IconButton>}
              anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
              targetOrigin={{ horizontal: 'left', vertical: 'top' }}
              className="menuButton"
            >
              <MenuItem
                primaryText="Delete"
                leftIcon={<DeleteIcon color="black" />}
                onClick={this.handleDeleteClick.bind(this)}
              />
            </IconMenu>
          }

          { activity.recipe &&
          <p>
            <b>Recipe Used:</b> <Link to={`/recipes/${activity.recipe.id}`}>{activity.recipe.data.name}</Link>
          </p>
          }
          {activity.oven_start && activity.oven_end &&
            <p>In the oven: {moment(activity.oven_start).format('h:mm:ss a')} {' - '}
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
            <p><b>Notes:</b> {activity.notes}</p>
          }

          { activity.recipe &&
            <RecipeDiff
              recipe={this.props.activity.recipe}
            />
          }
        </div>

      </Card>
    );
  }
}

function mapStateToProps({ auth }) {
  return {
    user: auth.user,
  };
}

export default connect(mapStateToProps, { deleteActivity })(ActivityCard);
