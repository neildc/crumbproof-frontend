import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';

import CPCard from './crumbproof_card';

import RecipesNewWizard1Basic from './recipes_new_wizard_1_basic';
import RecipesNewWizard2Ingredients from './recipes_new_wizard_2_ingredients';
import RecipesNewWizard3Instructions from './recipes_new_wizard_3_instructions';

import { createRecipe } from '../actions/actions_recipe';
import { RECIPE_NEW_FORM_NAME } from '../constants/form_names';

class RecipesNew extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handlePrev = this.handlePrev.bind(this);

    this.state = {
      stepIndex: 0,
    };
  }

  handleNext() {
    const { stepIndex } = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
    });
  }

  handlePrev() {
    const { stepIndex } = this.state;
    if (stepIndex > 0) {
      this.setState({ stepIndex: stepIndex - 1 });
    }
  }

  renderSteps(labels) {
    return _.map(labels, l => (
      <Step key={l}>
        <StepLabel>{l}</StepLabel>
      </Step>
    ));
  }

  onSubmit(values) {
    return this.props.createRecipe(values, () => {
      this.props.reset();
      this.props.history.push('/');
    });
  }

  render() {
    const { handleSubmit } = this.props;
    const { stepIndex } = this.state;
    const contentStyle = { margin: '0 16px' };
    const width = window.innerWidth;

    return (
      <CPCard title="New Recipe">
        <Stepper
          activeStep={stepIndex}
          orientation={width < 640 ? 'vertical' : 'horizontal'}
        >
          {this.renderSteps(['Basic Details', 'Ingredients', 'Instructions'])}
        </Stepper>

        <div style={contentStyle}>
          {stepIndex === 0 &&
           <RecipesNewWizard1Basic onSubmit={this.handleNext} />
          }

          {stepIndex === 1 &&
            <RecipesNewWizard2Ingredients
              previousPage={this.handlePrev}
              onSubmit={this.handleNext}
            />
          }

          {stepIndex === 2 &&
            <RecipesNewWizard3Instructions
              previousPage={this.handlePrev}
              onSubmit={handleSubmit(this.onSubmit)}
            />
          }

        </div>
      </CPCard>
    );
  }
}

export default reduxForm({
  form: RECIPE_NEW_FORM_NAME,
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(connect(null, { createRecipe })(RecipesNew));
