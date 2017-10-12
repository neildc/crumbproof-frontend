import "./login_index.css"

import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { authLogin } from "../actions";

import { Field, reduxForm } from "redux-form";
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import {Card,  CardTitle} from 'material-ui/Card';
import {required} from "../validators.js";


class LoginIndex extends Component {

  renderField(field) {
      const { meta: { touched, error } } = field;

      return (
          <div>
              <TextField
                  style={{width:"auto"}}
                  hintText=""
                  floatingLabelText={field.label}
                  errorText={touched && error}
                  {...field.input}
                  {...field.custom}
              />
          </div>
      );
  }

  onSubmit(values) {
    this.props.authLogin(values, (resp) => {
      localStorage.setItem('token', resp.data.key);
      this.props.history.push("/");
    });
  }

  render() {
    const { handleSubmit } = this.props;

      return(
          <Card className="loginCard">
            <CardTitle title="Login" className="loginCardTitle"/>

            <form onSubmit={handleSubmit(this.onSubmit.bind(this))} className="loginForm">

                <Field
                    label="Username"
                    name="username"
                    component={this.renderField}
                    validate={[ required ]}
                />
                <Field
                    label="Password"
                    name="password"
                    type="password"
                    component={this.renderField}
                    validate={[ required ]}
                />

                <RaisedButton
                    className="loginButton"
                    type="submit"
                    primary={true}
                    label="Login"
                />

            </form>
          </Card>
    );
  }
}

function validate(values) {
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
  form: "LoginForm"
})(connect(null, { authLogin })(LoginIndex));
