import React, { Component } from "react";
import PropTypes from 'prop-types';

import _ from "lodash";
import moment from "moment";

import {
  Step,
  Stepper,
  StepLabel,
  StepContent,
} from 'material-ui/Stepper';

export default class RecipeTimeline extends Component {

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
    let instructionsWithTimes = this.calculateTimes(this.props.instructions, timeNow);

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
    return (
      <Stepper linear={true} orientation="vertical">
        {this.renderSteps()}
      </Stepper>
    )
  }


}

RecipeTimeline.proptypes = {
  instructions: PropTypes.object.required
}
