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

  generateInstructionTimeline(instructions, startTime) {
    // instructions being passed in is simply a bunch of objects
    var instructionsArr =  _.orderBy(instructions, ["step_number"], ["asc"]);

    var timeline = [startTime];

    // Accumulate the time gaps from the starttime
    for (let i = 0; i < instructionsArr.length - 1; i++) {

      // time_gap_to_next is a Nullable field
      if (instructionsArr[i].time_gap_to_next) {
        timeline[i+1] = moment(timeline[i])
                          .add(instructionsArr[i].time_gap_to_next, 'minutes');
      } else {
        timeline[i+1] = moment(timeline[i]);
      }
    }

    return _.zipWith(timeline, instructionsArr, (time, instruction) => {
      // Add the dates from the timeline back into the instructions
      return Object.assign({}, instruction, {time})
    })
  }


  renderSteps() {

    // TODO: replace moment.now() with a user controllable time input
    let timeNow = moment();
    let instructionsWithTimes = this.generateInstructionTimeline(this.props.instructions, timeNow);

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
