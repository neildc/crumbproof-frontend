import React, { Component } from "react";
import { connect } from "react-redux";

import { fetchRecipes } from "../../actions/actions_recipe";
import _ from "lodash";
import RecipeIndexPresentation from "./recipes_index";

// import { Card } from 'material-ui/Card';

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


function mapStateToProps({ recipes, auth }) {
  if (auth.contentVisibilityUserOnly) {
    return { recipes: _.filter(recipes, { user: auth.user }) };
  } else {
      return { recipes: _.isEmpty(recipes) ? null : recipes  };
  }
}

export default connect(
  mapStateToProps,
  { fetchRecipes }
)(RecipesIndex);
