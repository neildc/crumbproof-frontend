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
import RaisedButton from 'material-ui/RaisedButton';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import IconButton from 'material-ui/IconButton';
import BackIcon from 'material-ui/svg-icons/navigation/arrow-back';
import { Card, CardTitle } from 'material-ui/Card';
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

      <Card containerStyle={{marginBottom:"50px"}}>
        <CardTitle className="cardTitle" title={
          <div className="cardTitleContents">
            <IconButton tooltip="Back to recipes"
                        containerElement={<Link to="/recipes"/>}>
              <BackIcon color="#999"/>
            </IconButton>
            <div style={{paddingTop:"5px"}}>
              {recipe.name}
            </div>
          </div>
        }/>
        <div className="recipeMeta">
          <div><b>BY  </b> {recipe.user_id}</div>
          <div><b>PREP  </b> {recipe.prep_time} mins</div>
          <div><b>BAKE  </b> {recipe.bake_time} mins at {recipe.oven_temperature}°</div>
          <div><b>YIELDS  </b> {recipe.yield_count} {recipe.yield_type}</div>
        </div>
        <div style={{padding:"30px"}}>

          {(this.props.user === recipe.user_id) &&
            <RaisedButton
              label="Delete Recipe"
              icon={<DeleteIcon/>}
              backgroundColor={"red"}
              labelColor={"white"}
              onClick={this.onDeleteClick.bind(this)}
              className={"deleteButton"}
            />
          }

          <h3>Ingredients</h3>
          <ul>
            {this.renderIngredients()}
          </ul>

          <h3>Instructions</h3>
          <Stepper linear={true} orientation="vertical">
            {this.renderSteps()}
          </Stepper>
        </div>
      </Card>
    );
  }
}

function mapStateToProps({ recipes, auth }, ownProps) {
  return {
    recipe: recipes[ownProps.match.params.id],
    user: auth.user
  };
}

export default connect(mapStateToProps, { fetchRecipe, deleteRecipe })(RecipesShow);
