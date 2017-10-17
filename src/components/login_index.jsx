import "./login_index.css"

import React, { Component } from "react";
import { connect } from "react-redux";
import { authLogin, authClearError } from "../actions/actions_auth.jsx";

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
    this.props.authLogin(values, (resp) => {
      this.props.history.push("/");
    }
  )};

  render() {
    const { handleSubmit } = this.props;

      return(
          <Card className="loginCard">
            <CardTitle title="Login" className="loginCardTitle"/>

            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}
                  className="loginForm">

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
              message={this.props.error ? this.props.error : ""}
              autoHideDuration={5000}
              style={{backgroundColor: "red"}}
              onRequestClose={this.props.authClearError}
            />
          </Card>
    );
  }
}

function mapStateToProps({ auth }, ownProps) {
  return { error: auth.error };
}

export default reduxForm({
  form: "LoginForm"
})(connect(mapStateToProps, { authLogin, authClearError })(LoginIndex));
