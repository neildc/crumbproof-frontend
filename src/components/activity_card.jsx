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
  constructor(props) {
    super(props);

    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }

  handleDeleteClick() {
    this.props.deleteActivity(this.props.activity.id, () => {});
  }

  renderRecipeHeader(activity) {

    const created = moment(activity.created).fromNow();

    return(
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
    )
  }

  renderMenu(deleteAction) {
    return(
      <IconMenu
        iconButtonElement={<IconButton tooltip="Menu"><TripleDotIcon /></IconButton>}
        anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
        targetOrigin={{ horizontal: 'left', vertical: 'top' }}
        className="menuButton"
      >
        <MenuItem
          primaryText="Delete"
          leftIcon={<DeleteIcon color="black" />}
          onClick={deleteAction}
        />
      </IconMenu>
    )
  }

  renderRecipeInfo(activity) {
    const { recipe, notes, started, completed } = activity;

    let duration = null;

    if (started && completed) {
      duration = moment(completed).diff(moment(started), 'hours');
    }

    return (
      <div>
        { recipe &&
          <p>
            <b>Recipe Used:</b> <Link to={`/recipes/${recipe.id}`}>{recipe.data.name}</Link>
          </p>
        }

        { completed &&
          <p>Completed: {completed}</p>
        }

        { duration &&
          <p>Total duration: {duration} hours</p>
        }

        { notes &&
          <p><b>Notes:</b> {notes}</p>
        }

        { recipe &&
          <RecipeDiff
            recipe={recipe}
          />
        }
      </div>
    )
  }

  render() {
    const { activity } = this.props;

    if (!activity) {
      return <ActivityCardPlaceholder />;
    }


    return (
      <Card style={this.props.style} >

        {this.renderRecipeHeader(activity)}

        {(this.props.user === activity.user) &&
          this.renderMenu(this.handleDeleteClick)
        }

e       <div style={{ padding: '30px' }}>
          {this.renderRecipeInfo(activity)}
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
