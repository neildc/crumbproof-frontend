import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchRecipe, deleteRecipe } from "../actions";

class RecipesShow extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchRecipe(id);
  }

  onDeleteClick() {
    const { id } = this.props.match.params;

    this.props.deleteRecipe(id, () => {
      this.props.history.push("/");
    });
  }

  render() {
    const { recipe } = this.props;

    if (!recipe) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <Link to="/">Back To Index</Link>
        <button
          className="btn btn-danger pull-xs-right"
          onClick={this.onDeleteClick.bind(this)}
        >
          Delete Recipe
        </button>
        <h3>{recipe.title}</h3>
        <h6>Categories: {recipe.categories}</h6>
        <p>{recipe.content}</p>
      </div>
    );
  }
}

function mapStateToProps({ recipes }, ownProps) {
  return { recipe: recipes[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchRecipe, deleteRecipe })(RecipesShow);
