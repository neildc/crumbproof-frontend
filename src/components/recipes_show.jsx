import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchRecipe, deleteRecipe } from "../actions";
import {
  Step,
  Stepper,
  StepLabel,
  StepContent,
} from 'material-ui/Stepper';
import CP_Card from "./crumbproof_card.jsx";

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

  renderSteps() {
    return _.map(this.props.recipe.instructions, instruction => {
      return (
        <Step key={instruction.step_number} active={true} >
          <StepLabel active={true} >
            Step {instruction.step_number}
          </StepLabel>
          <StepContent active={true}>
            <p>
              {instruction.content}
            </p>
          </StepContent>
        </Step>
      );
    });
  };

  render() {
    const { recipe } = this.props;

    if (!recipe) {
      return <div>Loading...</div>;
    }

    return (
      <CP_Card title={recipe.name}>
        <div>
          <Link to="/">Back To Index</Link>
          <button
            className="btn btn-danger pull-xs-right"
            onClick={this.onDeleteClick.bind(this)}
          >
            Delete Recipe
          </button>
          <p>Prep time: {recipe.prep_time} mins</p>
          <p>Bake time: {recipe.bake_time} mins</p>
          <p>Oven Temperature: {recipe.oven_temperature}°C</p>
          <p>Yields {recipe.yield_count} {recipe.yield_type}</p>
          <p>{recipe.content}</p>
          <Stepper linear={true} orientation="vertical">
            {this.renderSteps()}
          </Stepper>
        </div>
      </CP_Card>
    );
  }
}

function mapStateToProps({ recipes }, ownProps) {
  return { recipe: recipes[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchRecipe, deleteRecipe })(RecipesShow);
