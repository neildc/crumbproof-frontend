import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchRecipes } from '../../actions/actions_recipe';

import RecipeIndexPresentation from './recipes_index';

class RecipesIndex extends Component {
  constructor(props) {
    super(props);
    this.handleRecipeClick = this.handleRecipeClick.bind(this);
  }

  componentDidMount() {
    this.props.fetchRecipes();
  }

  handleRecipeClick(id) {
    this.props.history.push(`/recipes/${id}`);
  }

  render() {
    return (
      <RecipeIndexPresentation
        recipes={this.props.recipes}
        onRecipeClick={this.handleRecipeClick}
      />
    );
  }
}

function mapStateToProps(state) {
  return { recipes: state.recipes };
}

export default connect(mapStateToProps, { fetchRecipes })(RecipesIndex);
