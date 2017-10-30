import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchRecipes } from "../actions/actions_recipe";
import {List, ListItem} from 'material-ui/List';
import ContentSend from 'material-ui/svg-icons/content/send';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import CPCard from './crumbproof_card.jsx';
import LinearProgress from 'material-ui/LinearProgress';


class RecipesIndex extends Component {
  componentDidMount() {
    this.props.fetchRecipes();
  }

  renderRecipes() {

    // Need to _.values as recipes is an object
    if (_.values(this.props.recipes).length === 0) {
      return <LinearProgress mode="indeterminate" />;
    }

    return _.map(this.props.recipes, recipe => {
      return (
        <ListItem
          key={recipe.id}
          primaryText={recipe.data.name}
          leftIcon={<ContentSend/>}
          containerElement={
            <Link to={`/recipes/${recipe.id}`} />
          }>
        </ListItem>
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
