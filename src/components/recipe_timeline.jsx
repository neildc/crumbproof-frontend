import React, { Component } from 'react';
import PropTypes from 'prop-types';

import _ from 'lodash';
import moment from 'moment';

import {
  Step,
  Stepper,
  StepLabel,
  StepContent,
} from 'material-ui/Stepper';
import TimePicker from 'material-ui/TimePicker';

import generateInstructionTimeline from '../util/instruction_timeline';

export default class RecipeTimeline extends Component {
  constructor(props) {
    super(props);
    this.handleTimePickerChange = this.handleTimePickerChange.bind(this);
    this.state = {
      recipeStartTime: moment(),
    };
  }

  handleTimePickerChange(event, date) {
    this.setState({ recipeStartTime: moment(date) });
  }

  renderSteps() {
    const instructionsWithTimes = generateInstructionTimeline(
      this.props.instructions,
      this.state.recipeStartTime,
    );

    return _.map(instructionsWithTimes, instruction => (
      <Step key={instruction.id} active >
        <StepLabel active >
          <span role="img" aria-label="Time">🕒 </span> {instruction.time.calendar()}
        </StepLabel>
        <StepContent active>
          <p>
            {instruction.content} {instruction.time_gap_to_next && `for ${instruction.time_gap_to_next} minutes`}
          </p>
        </StepContent>
      </Step>
    ));
  }

  render() {
    return (
      <div>
        <TimePicker
          format="ampm"
          hintText="Change recipe start time"
          onChange={this.handleTimePickerChange}
        />
        <Stepper linear orientation="vertical">
          {this.renderSteps()}
        </Stepper>
      </div>
    );
  }
}

RecipeTimeline.proptypes = {
  instructions: PropTypes.array.required,
};
