import React, { Component } from 'react';
import { connect } from 'react-redux';

import RecipeShowPresentation from './recipe_show';

import { fetchRecipe, deleteRecipe } from '../../actions/actions_recipe';


class RecipeShow extends Component {
  componentDidMount() {
    if (!this.props.recipe) {
      const { id } = this.props.match.params;
      this.props.fetchRecipe(id);
    }
  }

  componentDidUpdate() {
    /* This guard is needed for the case that a recipe is deleted.
     *
     * Once a recipe is deleted, it's removed from the store
     * triggering an update before any rerouting happens.
     */
    if (this.props.recipe) {
      if (this.props.recipe.parent && !this.props.parentRecipe) {
        this.props.fetchRecipe(this.props.recipe.parent);
      }

      if (this.props.recipe.base_recipe && !this.props.baseRecipe) {
        this.props.fetchRecipe(this.props.recipe.base_recipe);
      }
    }
  }

  handleDeleteClick() {
    const { id } = this.props.match.params;

    this.props.deleteRecipe(id, () => {
      this.props.history.push('/recipes');
    });
  }

  handleRecordActivityClick() {
    const { id } = this.props.match.params;
    this.props.history.push(`/activity/new/recipe/${id}`);
  }

  handleStartActivityClick() {
    const { id } = this.props.match.params;
    this.props.history.push(`/live/start/recipe/${id}`);
  }

  render() {
    const { recipe, parentRecipe, baseRecipe } = this.props;

    return (
      <RecipeShowPresentation
        recipe={recipe}
        parentRecipe={parentRecipe}
        baseRecipe={baseRecipe}
        onDeleteClick={this.handleDeleteClick.bind(this)}
        onRecordActivityClick={this.handleRecordActivityClick.bind(this)}
        onStartActivityClick={this.handleStartActivityClick.bind(this)}
      />
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

export default connect(mapStateToProps, { fetchRecipe, deleteRecipe })(RecipeShow);
