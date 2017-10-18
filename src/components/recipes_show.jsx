import "./recipes_show.css";
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
import CPCard from "./crumbproof_card.jsx";
import RaisedButton from 'material-ui/RaisedButton';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import moment from "moment";

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

  calculateTimes(instructions, startTime) {
    // instructions being passed in is simply a bunch of objects
    var instructionsArray =  _.orderBy(instructions, ["step_number"], ["asc"]);
    var i;

    instructionsArray[0].time = startTime;

    // Accumulate the time gaps from the starttime
    for (i = 0; i < instructionsArray.length - 1; i++) {

      // time_gap_to_next is a Nullable field
      if (instructionsArray[i].time_gap_to_next) {
        instructionsArray[i+1].time = moment(instructions[i].time)
                                      .add(instructions[i].time_gap_to_next, 'minutes')
      } else {
        instructionsArray[i+1].time = moment(instructions[i].time)
                                      .add(0, 'minutes')
      }

    }
    return instructionsArray
  }

  renderSteps() {

    // TODO: replace moment.now() with a user controllable time input
    let timeNow = moment();
    let instructionsWithTimes = this.calculateTimes(this.props.recipe.instructions, timeNow);

    return _.map(instructionsWithTimes, instruction => {
      return (
        <Step key={instruction.step_number} active={true} >
          <StepLabel active={true} >
            <span role="img" aria-label="Time">🕒 </span> {instruction.time.format("h:mmA on dddd")}
          </StepLabel>
          <StepContent active={true}>
            <p>
              {instruction.content} {instruction.time_gap_to_next && `for ${instruction.time_gap_to_next} minutes`}
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
      <CPCard title={recipe.name} titleChildren={<Link to="/">Back To Index</Link>}>
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
      </CPCard>
    );
  }
}

function mapStateToProps({ recipes }, ownProps) {
  return { recipe: recipes[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchRecipe, deleteRecipe })(RecipesShow);
