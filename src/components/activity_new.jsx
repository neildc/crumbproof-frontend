import React, { Component } from "react";
import { Field, reduxForm , FieldArray } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createActivity } from "../actions";
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import CP_Card from './crumbproof_card.jsx'
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui/svg-icons/content/remove-circle'
import {required, isNumber } from "../validators.js"
import TimePicker from 'material-ui/TimePicker';

class ActivityNew extends Component {
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

  renderTimePicker = (field) => {
    return (
      <div style={{padding:"20px"}}>
        {field.label}
        <TimePicker
          hintText={"Please enter a time"}
          onChange={(notUsed, time) => {
              field.input.onChange(time);
          }}
        />
      </div>
    );
  }

  onSubmit(values) {
    this.props.createActivity(values, () => {
      this.props.history.push("/activity");
    });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <CP_Card title={"New Activity"}>
          <form
            onSubmit={handleSubmit(this.onSubmit.bind(this))}
            style={{margin:"20px"}}
          >
            <Field
              label="Name For Activity"
              name="name"
              component={this.renderField}
              validate={[ required ]}
            />

            <Field
              label="Started"
              name="started"
              initialValues={new Date()}
              component={this.renderTimePicker}
              validate={[ required ]}
            />

            <Field
              label="Completed"
              name="completed"
              component={this.renderTimePicker}
              validate={[ required ]}
            />
            <Field
              label="Time put into oven"
              name="oven_start"
              component={this.renderTimePicker}
              validate={[ required ]}
            />
            <Field
              label="Time pulled out of oven"
              name="oven_end"
              component={this.renderTimePicker}
              validate={[ required ]}
            />
            <div style={{marginTop: 12}}>
              <RaisedButton
                label={'Submit'}
                type={'submit'}
                primary={true}
              />
            </div>
          </form>
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
  form: "ActivityNewForm"
})(connect(null, { createActivity })(ActivityNew));