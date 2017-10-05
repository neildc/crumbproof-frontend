import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchRecipes } from "../actions";
import {List, ListItem} from 'material-ui/List';
import ContentSend from 'material-ui/svg-icons/content/send';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Subheader from 'material-ui/Subheader';



class RecipesIndex extends Component {
  componentDidMount() {
    this.props.fetchRecipes();
  }

  renderRecipes() {
    return _.map(this.props.recipes, recipe => {
      return (
        <ListItem
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

      <div>
        <Subheader>Recipes</Subheader>
        <List>
          {this.renderRecipes()}
        </List>
        <div className="text-xs-right">
            <FloatingActionButton>
                <Link to="/recipes/new">
                    <ContentAdd />
                </Link>
            </FloatingActionButton>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { recipes: state.recipes };
}

export default connect(mapStateToProps, { fetchRecipes })(RecipesIndex);
