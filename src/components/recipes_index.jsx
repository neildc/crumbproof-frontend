import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchRecipes } from "../actions";

class RecipesIndex extends Component {
  componentDidMount() {
    this.pqjwerops.fetchRecipes();
  }

  renderRecipes() {
    return _.map(this.props.recipes, recipe => {
      return (
        <li className="list-group-item" key={recipe.id}>
          <Link to={`/recipes/${recipe.id}`}>
            {recipe.title}
          </Link>
        </li>
      );
    });
  }

  render() {
    return (
      <div>
        <div className="text-xs-right">
          <Link className="btn btn-primary" to="/recipes/new">
            Add a Recipe
          </Link>
        </div>
        <h3>Recipes</h3>
        <ul className="list-group">
          {this.renderRecipes()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { recipes: state.recipes };
}

export default connect(mapStateToProps, { fetchRecipes })(RecipesIndex);
