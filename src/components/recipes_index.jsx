import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { List, ListItem } from 'material-ui/List';
import LinearProgress from 'material-ui/LinearProgress';
import ContentSend from 'material-ui/svg-icons/content/send';
import ArrowRight from 'material-ui/svg-icons/navigation/subdirectory-arrow-right';
import ContentAdd from 'material-ui/svg-icons/content/add';

import { fetchRecipes } from '../actions/actions_recipe';

import CPCard from './crumbproof_card';
import FloatingActionButton from './floating_action_button';

class RecipesIndex extends Component {
  componentDidMount() {
    this.props.fetchRecipes();
  }


  handleRecipeClick(id) {
    this.props.history.push(`/recipes/${id}`);
  }

  renderRecipeNode(recipe) {
    return (
      <ListItem
        key={recipe.id}
        primaryText={recipe.data.name}
        secondaryText={`By ${recipe.user}`}
        leftIcon={recipe.base_recipe === null ? <ContentSend /> : <ArrowRight />}
        initiallyOpen
        onClick={this.handleRecipeClick.bind(this, recipe.id)}
        nestedItems={this.renderRecipeChildren(recipe.children)}
      />
    );
  }

  renderRecipeChildren(children) {
    if (!children) return null;

    return _.map(children, r => this.renderRecipeNode(r));
  }

  buildRecipeTree(recipesList) {
    const recipes = _.mapKeys(
      _.map(recipesList, r => ({ ...r, children: [] }))
      , 'id',
    );

    const root = _.filter(recipes, r => r.base_recipe === null);

    const variants = _.filter(recipes, r => r.base_recipe !== null);
    _.forEach(variants, r => recipes[r.parent].children.push(r));

    return root;
  }

  renderRecipes() {
    // Need to _.values as recipes is an object
    if (_.values(this.props.recipes).length === 0) {
      return <LinearProgress mode="indeterminate" />;
    }

    const recipeTree = this.buildRecipeTree(this.props.recipes);

    return _.map(recipeTree, rootRecipe => (
      this.renderRecipeNode(rootRecipe)
    ));
  }

  render() {
    return (
      <div>
        <FloatingActionButton link="/recipes/new">
          <ContentAdd />
        </FloatingActionButton>
        <CPCard title="Recipes">
          <List>
            {this.renderRecipes()}
          </List>
        </CPCard>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { recipes: state.recipes };
}

export default connect(mapStateToProps, { fetchRecipes })(RecipesIndex);
