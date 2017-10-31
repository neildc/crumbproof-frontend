import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchRecipes } from "../actions/actions_recipe";
import {List, ListItem} from 'material-ui/List';
import ContentSend from 'material-ui/svg-icons/content/send';
import ArrowRight from 'material-ui/svg-icons/navigation/subdirectory-arrow-right';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import CPCard from './crumbproof_card.jsx';
import LinearProgress from 'material-ui/LinearProgress';


class RecipesIndex extends Component {
  componentDidMount() {
    this.props.fetchRecipes();
  }



  renderRecipeNode(recipe) {
    return (
      <ListItem
        key={recipe.id}
        primaryText={recipe.data.name}
        leftIcon={recipe.base_recipe === null ? <ContentSend/>:<ArrowRight/>}
        open={true}
        nestedItems={this.renderRecipeChildren(recipe.children)}
        containerElement={
          <Link to={`/recipes/${recipe.id}`} />
        }>
      </ListItem>
    );
  }

  renderRecipeChildren(children) {
    if (!children) return null;
    return _.map(children, r => {
        return this.renderRecipeNode(r)
    });
  }

  buildRecipeTree(recipesList) {

    let recipes = _.mapKeys(
                    _.map(recipesList, r => ({...r, children:[]}))
                  , 'id');

    let root = _.filter(recipes, r => r.base_recipe === null);

    let variants = _.filter(recipes, r => r.base_recipe !== null);
    _.forEach(variants, (r) => recipes[r.parent].children.push(r));

    return root;
  }

  renderRecipes() {

    // Need to _.values as recipes is an object
    if (_.values(this.props.recipes).length === 0) {
      return <LinearProgress mode="indeterminate" />;
    }

    let recipeTree = this.buildRecipeTree(this.props.recipes);

    return _.map(recipeTree, rootRecipe => {
      return (
        this.renderRecipeNode(rootRecipe)
      );
    });
  }

  render() {
    return (
        <CPCard title="Recipes">
            <List>
            {this.renderRecipes()}
            </List>
            <div style={{float:"right"}}>
                <FloatingActionButton containerElement={<Link to="/recipes/new"/>}>
                    <ContentAdd/>
                </FloatingActionButton>
            </div>
        </CPCard>
    );
  }
}

function mapStateToProps(state) {
  return { recipes: state.recipes };
}

export default connect(mapStateToProps, { fetchRecipes })(RecipesIndex);
