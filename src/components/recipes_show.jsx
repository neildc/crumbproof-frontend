import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';

import LinearProgress from 'material-ui/LinearProgress';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import AddIcon from 'material-ui/svg-icons/content/add-circle';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import BackIcon from 'material-ui/svg-icons/navigation/arrow-back';
import { Card, CardTitle, CardHeader, CardText } from 'material-ui/Card';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

import RecipeTimeline from './recipe_timeline';
import ActivityGallery from './activities_gallery';
import RecipeDiff from './recipe_diff';
import { FadeIn } from './animations/fade';

import { fetchRecipe, deleteRecipe } from '../actions/actions_recipe';
import { getTotalTimeStr } from '../util/time';

import './recipes_show.css';

class RecipesShow extends Component {
  componentDidMount() {
    if (!this.props.recipe) {
      const { id } = this.props.match.params;
      this.props.fetchRecipe(id);
    }
  }

  componentDidUpdate() {
    if (this.props.recipe.parent && !this.props.parentRecipe) {
      this.props.fetchRecipe(this.props.recipe.parent);
    }

    if (this.props.recipe.base_recipe && !this.props.baseRecipe) {
      this.props.fetchRecipe(this.props.recipe.base_recipe);
    }
  }

  onDeleteClick() {
    const { id } = this.props.match.params;

    this.props.deleteRecipe(id, () => {
      this.props.history.push('/recipes');
    });
  }

  onRecordActivityClick() {
    const { id } = this.props.match.params;
    this.props.history.push(`/activity/new/recipe/${id}`);
  }

  onStartActivityClick() {
    const { id } = this.props.match.params;
    this.props.history.push(`/live/start/recipe/${id}`);
  }

  renderIngredients() {
    return _.map(this.props.recipe.data.ingredients, i => (
      <li key={i.name}>
        {i.quantity} {i.unit} {i.name}
      </li>
    ));
  }

  renderRecipe(recipe) {
    return (
      <Card containerStyle={{ marginBottom: '20px' }} initiallyExpanded>
        <CardHeader title="RECIPE" showExpandableButton />
        <CardText expandable style={{ padding: '30px', paddingTop: '0px' }}>


          { recipe.data.credits &&
            <div>
              <h3>Credits:</h3>
              {recipe.data.credits}
            </div>
          }
          <h3>Ingredients</h3>

          <ul> {this.renderIngredients()} </ul>

          <h3>Instructions</h3>
          <RecipeTimeline instructions={recipe.data.instructions} />
        </CardText>
      </Card>
    );
  }

  renderHistory() {
    const { recipe, baseRecipe, parentRecipe } = this.props;

    if (!baseRecipe) {
      return <LinearProgress mode="indeterminate" />;
    }

    return (
      <Card containerStyle={{ marginBottom: '20px' }} initiallyExpanded>
        <CardHeader
          title="RECIPE HISTORY"
          showExpandableButton
        />
        <CardText expandable style={{ padding: '30px', paddingTop: '0px' }}>
          <h3>Recipe based off:</h3>
          <Link to={`/recipes/${baseRecipe.id}`}>{baseRecipe.data.name}</Link>
          {` created ${moment(baseRecipe.created).fromNow()}`}

          {parentRecipe &&
            <div>
              <h3>Previous iteration of this recipe:</h3>
              <Link to={`/recipes/${parentRecipe.id}`}>
                {parentRecipe.data.name}
              </Link>
              {` created ${moment(parentRecipe.created).fromNow()}`}

              <h2>Changes made:</h2>
              <RecipeDiff recipe={recipe} />
            </div>
            }
        </CardText>
      </Card>
    );
  }

  render() {
    const { recipe } = this.props;

    if (!recipe) {
      return <LinearProgress mode="indeterminate" />;
    }

    return (

      <FadeIn>
        <Card containerStyle={{ marginBottom: '20px' }}>
          <CardTitle
            className="cardTitle"
            title={
              <div className="cardTitleContents">
                <IconButton
                  tooltip="Back to recipes"
                  containerElement={<Link to="/recipes" />}
                >
                  <BackIcon color="#999" />
                </IconButton>
                <div style={{ paddingTop: '5px' }}>
                  {recipe.data.name}
                </div>
              </div>
        }
          />
          <div className="recipeMeta">
            <div><b>BY  </b> {recipe.user}</div>
            <div><b>TIME  </b> {getTotalTimeStr(recipe.data.instructions)}</div>
            <div><b>BAKE  </b> {recipe.data.bake_time} mins at {recipe.data.oven_temperature}°</div>
            <div><b>YIELDS  </b> {recipe.data.yield_count} {recipe.data.yield_type}</div>
          </div>
          <div style={{ padding: '30px' }}>

            {(this.props.user === recipe.user) &&
            <IconMenu
              iconButtonElement={
                <IconButton tooltip="Delete this recipe">
                  <DeleteIcon />
                </IconButton>
              }
              anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
              targetOrigin={{ horizontal: 'left', vertical: 'top' }}
              className="recipeActions"
            >
              <MenuItem
                primaryText="Confirm Deletion"
                leftIcon={<DeleteIcon color="black" />}
                onClick={this.onDeleteClick.bind(this)}
              />
            </IconMenu>
          }

            <h3>Recent Activity</h3>
            <ActivityGallery recipeId={Number(this.props.match.params.id)} />
            <RaisedButton
              label="Record an activity with this recipe"
              icon={<AddIcon />}
              onClick={this.onRecordActivityClick.bind(this)}
              style={{ margin: '20px 0' }}
            />
            <br />
            <RaisedButton
              label="Start guided activity"
              icon={<AddIcon />}
              labelColor="white"
              onClick={this.onStartActivityClick.bind(this)}
              primary
              style={{ margin: '20px 0' }}
            />
          </div>
        </Card>

        { this.renderRecipe(recipe) }

        { recipe.base_recipe &&
         this.renderHistory()
      }
      </FadeIn>
    );
  }
}

function mapStateToProps({ recipes, auth }, ownProps) {
  const recipe = recipes[ownProps.match.params.id];

  if (!recipe) {
    return { user: auth.user };
  }

  const parentRecipe = recipes[recipe.parent];
  const baseRecipe = recipes[recipe.base_recipe];

  return {
    recipe,
    parentRecipe,
    baseRecipe,
    user: auth.user,
  };
}

export default connect(mapStateToProps, { fetchRecipe, deleteRecipe })(RecipesShow);
