import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchRecipe, deleteRecipe } from "../actions";
import {
  Step,
  Stepper,
  StepLabel,
  StepContent,
} from 'material-ui/Stepper';
import LinearProgress from 'material-ui/LinearProgress';
import CP_Card from "./crumbproof_card.jsx";
import RaisedButton from 'material-ui/RaisedButton';
import DeleteIcon from 'material-ui/svg-icons/action/delete';

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

  renderIngredients() {
    return _.map(this.props.recipe.ingredients, i => {
      return (
        <li key={i.name}>
          {i.quantity} {i.unit} {i.name}
        </li>
      );
    });
  };

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
      return <LinearProgress mode="indeterminate" />;
    }

    return (
      <CP_Card title={recipe.name} titleChildren={<Link to="/">Back To Index</Link>}>
        <div>
          <RaisedButton
            label="Delete Recipe"
            icon={<DeleteIcon/>}
            backgroundColor={"red"}
            labelColor={"white"}
            onClick={this.onDeleteClick.bind(this)}
            style={{float: "right"}}
          />
          <p>Created by: {recipe.user_id}</p>
          <p>Prep time: {recipe.prep_time} mins</p>
          <p>Bake time: {recipe.bake_time} mins</p>
          <p>Oven Temperature: {recipe.oven_temperature}°C</p>
          <p>Yields {recipe.yield_count} {recipe.yield_type}</p>

          <h3>Ingredients</h3>
          <ul>
            {this.renderIngredients()}
          </ul>

          <h3>Instructions</h3>
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
