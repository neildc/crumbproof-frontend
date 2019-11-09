import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";

import { List, ListItem } from "material-ui/List";
import LinearProgress from "material-ui/LinearProgress";
import ContentSend from "material-ui/svg-icons/content/send";
import ArrowRight from "material-ui/svg-icons/navigation/subdirectory-arrow-right";
import ContentAdd from "material-ui/svg-icons/content/add";

import CPCard from "../crumbproof_card";
import FloatingActionButton from "../floating_action_button";

const renderRecipeNode = (recipe, onRecipeClick) => (
  <ListItem
    key={recipe.id}
    primaryText={recipe.data.name}
    secondaryText={`By ${recipe.user}`}
    leftIcon={recipe.base_recipe === null ? <ContentSend /> : <ArrowRight />}
    initiallyOpen
    onClick={() => onRecipeClick(recipe.id)}
    nestedItems={
      recipe.children
        ? _.map(recipe.children, r => renderRecipeNode(r, onRecipeClick))
        : null
    }
  />
);

const buildRecipeTree = recipesList => {
  const recipes = _.mapKeys(
    _.map(recipesList, r => ({ ...r, children: [] })),
    "id"
  );

  // When content is filtered to user's only the original base recipes
  // might not exist because it from another user
  _.forEach(recipes, r => { if (recipes[r.parent] == null)  r.base_recipe = null } );

  const root = _.filter(recipes, r => r.base_recipe === null);

  const variants = _.filter(recipes, r => r.base_recipe !== null);
  _.forEach(variants, r => recipes[r.parent].children.push(r));

  return root;
};

const renderRecipes = ({ recipes, onRecipeClick }) => {
  // Need to _.values as recipes is an object
  if (_.values(recipes).length === 0) {
    return <LinearProgress mode="indeterminate" />;
  }

  const recipeTree = buildRecipeTree(recipes);

  return _.map(recipeTree, rootRecipe =>
    renderRecipeNode(rootRecipe, onRecipeClick)
  );
};

const RecipeIndexPresentation = props => {
  return (
    <div>
      <FloatingActionButton link="/recipes/new">
        <ContentAdd />
      </FloatingActionButton>
      <CPCard title="Recipes">
        <List>{renderRecipes(props)}</List>
      </CPCard>
    </div>
  );
};

RecipeIndexPresentation.propTypes = {
  recipes: PropTypes.object,
  onRecipeClick: PropTypes.func.isRequired
};

export default RecipeIndexPresentation;
