import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchRecipes } from "../actions";
import {List, ListItem} from 'material-ui/List';
import ContentSend from 'material-ui/svg-icons/content/send';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import CP_Card from './crumbproof_card.jsx';


class RecipesIndex extends Component {
  componentDidMount() {
    this.props.fetchRecipes();
  }

  renderRecipes() {

    return _.map(this.props.recipes, recipe => {
      return (
        <ListItem
          key={recipe.id}
          primaryText={recipe.name}
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
        <CP_Card title="Recipes">
            <List>
            {this.renderRecipes()}
            </List>
            <div style={{float:"right"}}>
                <FloatingActionButton containerElement={<Link to="/recipes/new"/>}>
                    <ContentAdd/>
                </FloatingActionButton>
            </div>
        </CP_Card>
    );
  }
}

function mapStateToProps(state) {
  return { recipes: state.recipes };
}

export default connect(mapStateToProps, { fetchRecipes })(RecipesIndex);
