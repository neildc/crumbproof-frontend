import "./login_index.css"

import React, { Component } from "react";
import { connect } from "react-redux";
import { authLogin, authClearError } from "../actions";

import { Field, reduxForm } from "redux-form";
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import {Card,  CardTitle} from 'material-ui/Card';
import {required} from "../validators.js";

import Snackbar from 'material-ui/Snackbar';

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
    this.props.authLogin(values,
    (resp) => {
      localStorage.setItem('token', resp.data.key);
      this.props.history.push("/");
    },
    (error) => {
      if (!error.response) {
        this.setState({
          message: "Please check your internet or try again later"
        });
      } else if (error.response.status === 400) {
        this.setState({
          message: "Please enter a valid username and password"
        });
      }
    }
  )};

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

            <Snackbar
              open={this.props.error != null}
              message={this.props.error}
              autoHideDuration={5000}
              style={{backgroundColor: "red"}}
              onRequestClose={this.props.authClearError}
            />
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

function mapStateToProps({ auth }, ownProps) {
  return { error: auth.error };
}

export default reduxForm({
  validate,
  form: "LoginForm"
})(connect(mapStateToProps, { authLogin, authClearError })(LoginIndex));
