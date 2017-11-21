import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchRecipe } from '../../actions/actions_recipe';
import RecipeDiffPresentation from './recipe_diff';

class RecipeDiff extends Component {
  componentDidMount() {
    if (this.props.recipe.diff && !this.props.parentRecipe) {
      this.props.fetchRecipe(this.props.recipe.parent);
    }
  }

  render() {
    const { recipe, parentRecipe } = this.props;

    return (
      <RecipeDiffPresentation recipe={recipe} parentRecipe={parentRecipe} />
    );
  }
}


function mapStateToProps({ recipes }, ownProps) {
  const parentRecipe = ownProps.recipe.parent;

  if (!parentRecipe) { return {}; }

  if (!recipes[parentRecipe]) { return {}; }

  return {
    parentRecipe: recipes[parentRecipe],
  };
}

export default connect(mapStateToProps, { fetchRecipe })(RecipeDiff);
