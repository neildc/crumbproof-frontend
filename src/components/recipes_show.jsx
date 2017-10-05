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

class RecipesShow extends Component {

  state = {
    stepIndex: 0,
  };

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
    const {stepIndex} = this.state;

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
        <h3>{recipe.name}</h3>
        <p>Prep time: {recipe.prep_time} mins</p>
        <p>Bake time: {recipe.bake_time} mins</p>
        <p>Oven Temperature: {recipe.oven_temperature}°C</p>
        <p>Yields {recipe.yield_count} {recipe.yield_type}</p>
        <p>{recipe.content}</p>
        <Stepper linear={true} orientation="vertical">

            <Step active={true}>
                <StepLabel active={true} onClick={() => this.setState({stepIndex: 1})}>
                    Step 1
                </StepLabel>
                <StepContent active={true}>
                <p>
                    For each ad campaign that you create, you can control how much
                    you're willing to spend on clicks and conversions, which networks
                    and geographical locations you want your ads to show on, and more.
                </p>
                </StepContent>
            </Step>
            <Step >
                <StepLabel active={true} onClick={() => this.setState({stepIndex: 2})}>
                    Step 2
                </StepLabel>
                <StepContent active={true}>
                <p>
                    For each ad campaign that you create, you can control how much
                    you're willing to spend on clicks and conversions, which networks
                    and geographical locations you want your ads to show on, and more.
                </p>
                </StepContent>
            </Step>
            <Step >
                <StepLabel active={true} onClick={() => this.setState({stepIndex: 2})}>
                    Step 3
                </StepLabel>
                <StepContent active={true}>
                <p>
                    For each ad campaign that you create, you can control how much
                    you're willing to spend on clicks and conversions, which networks
                    and geographical locations you want your ads to show on, and more.
                </p>
                </StepContent>
            </Step>
        </Stepper>
      </div>
    );
  }
}

function mapStateToProps({ recipes }, ownProps) {
  return { recipe: recipes[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchRecipe, deleteRecipe })(RecipesShow);
