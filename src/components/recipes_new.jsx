import React, { Component } from "react";
import { Field, reduxForm , FieldArray } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createRecipe } from "../actions";
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import CP_Card from './crumbproof_card.jsx'
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui/svg-icons/content/remove-circle'
import {required, isNumber } from "../validators.js"

import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import FlatButton from 'material-ui/FlatButton';

class RecipesNew extends Component {
  renderField(field) {
    const { meta: { touched, error } } = field;

    return (
      <div>
        <TextField
            hintText=""
            floatingLabelText={field.label}
            errorText={touched && error}
            {...field.input}
            {...field.custom}
        />
      </div>
    );
  }

  renderIngredients = ({ fields }) => (
    <ul>
      {fields.map((ingredient, index) =>
        <li key={index}>
          <div style={{display:"flex", flexDirection:"row"}}>
            <h4>Ingredient #{index + 1}</h4>
            <IconButton
              tooltip="Remove ingredient"
              style={{marginLeft:"10px"}}
              onClick={() => fields.remove(index)}>
              <DeleteIcon/>
            </IconButton>
          </div>
          <Field
            label="Ingredient"
            name={`${ingredient}.name`}
            type="text"
            component={this.renderField}
            validate={[ required ]}
            />
          <Field
            label="Quantity"
            name={`${ingredient}.quantity`}
            component={this.renderField}
            parse={value => Number(value)}
            validate={[ required, isNumber ]}
            />
          <Field
            label="Unit"
            name={`${ingredient}.unit`}
            component={this.renderField}
            validate={[ required ]}
            />
        </li>
      )}
      <RaisedButton type="RaisedButton" onClick={() => fields.push({})} label="Add Ingredient"/>
    </ul>
  )

  renderInstructions = ({ fields }) => (
    <ul>
      {fields.map((step, index) =>
        <li key={index}>
          <div style={{display:"flex", flexDirection:"row"}}>
            <Field
              label={`Step ${index + 1}`}
              name={`${step}.content`}
              type="text"
              component={this.renderField}
              />
            <IconButton
              tooltip="Remove step"
              style={{marginLeft:"10px"}}
              onClick={() => fields.remove(index)}>
              <DeleteIcon/>
            </IconButton>
          </div>
        </li>
      )}
      <RaisedButton type="button" onClick={() => fields.push({})} label="Add Step"/>
    </ul>
  )

  onSubmit(values) {
    this.props.createRecipe(values, () => {
      this.props.history.push("/");
    });
  }

  state = {
    stepIndex: 0,
  };

  handleNext = () => {
    const {stepIndex} = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
    });
  };

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  };

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <div>
          <Field
            label="Name For Recipe"
            name="name"
            component={this.renderField}
            validate={[ required ]}
          />

          <Field
            label="Prep Time (minutes)"
            name="prep_time"
            parse={value => Number(value)}
            component={this.renderField}
            validate={[ required, isNumber ]}
          />
          <Field
            label="Bake Time (minutes)"
            name="bake_time"
            component={this.renderField}
            parse={value => Number(value)}
            validate={[ required, isNumber ]}
          />

          <Field
            label="Oven Temperature (°C)"
            name="oven_temperature"
            component={this.renderField}
            parse={value => Number(value)}
            validate={[ required, isNumber ]}
          />

          <Field
            label="Yield Count"
            name="yield_count"
            component={this.renderField}
            parse={value => Number(value)}
            validate={[ required, isNumber ]}
          />
          <Field
          label="Yield Type"
          name="yield_type"
          component={this.renderField}
          validate={[ required ]}
          />
          </div>
        );

      case 1:
        return (
          <div>
            <FieldArray name="ingredients" component={this.renderIngredients}/>
          </div>
        );

      case 2:
        return (
          <div>
            <FieldArray name="instructions" component={this.renderInstructions}/>
          </div>
        );
      default:
        return 'You\'re a long way from home sonny jim!';
    }
  }

  renderSteps(labels) {
    return _.map(labels, l => {
      return (
        <Step>
          <StepLabel>{l}</StepLabel>
        </Step>
      );
    });
  };

  render() {
    const { handleSubmit } = this.props;
    const { stepIndex} = this.state;
    const contentStyle = {margin: '0 16px'};
    const BASIC_DETAILS = 0;
    const INGREDIENTS = 1;
    const INSTRUCTIONS = 2;

    return (
        <CP_Card title={"New Recipe"}>
          <Stepper activeStep={stepIndex}>
            {this.renderSteps(["Basic Details", "Ingredients", "Instructions"])}
          </Stepper>

        <div style={contentStyle}>
          <form
            onSubmit={handleSubmit(this.onSubmit.bind(this))}
            style={{margin:"20px"}}
          >
            <p>{this.getStepContent(stepIndex)}</p>

              <div style={{marginTop: 12}}>
                <FlatButton
                  label="Back"
                  disabled={stepIndex === BASIC_DETAILS}
                  onClick={this.handlePrev}
                  style={{marginRight: 12}}
                />
                <RaisedButton
                  label={stepIndex === INSTRUCTIONS ? 'Submit' : 'Next'}
                  type={stepIndex === INSTRUCTIONS ? 'submit' : 'button'}
                  onClick={stepIndex === INSTRUCTIONS ? this.props.onSubmit: this.handleNext}
                  primary={true}
                />
              </div>
            </form>
          </div>
        </CP_Card>
    );
  }
}

function validate(values) {
  // console.log(values) -> { title: 'asdf', categories: 'asdf', content: 'asdf' }
  const errors = {};

  // Validate the inputs from 'values'
  if (!values.name) {
    errors.name = "Enter a name";
  }

  // If errors is empty, the form is fine to submit
  // If errors has *any* properties, redux form assumes form is invalid
  return errors;
}

export default reduxForm({
  validate,
  form: "RecipesNewForm"
})(connect(null, { createRecipe })(RecipesNew));
