import "./register_index.css"

import React, { Component } from "react";
import { connect } from "react-redux";
import { authRegister, authClearError } from "../actions/actions_auth.jsx";

import { Field, reduxForm } from "redux-form";
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import {Card,  CardTitle} from 'material-ui/Card';
import {required} from "../validators.js";

import Snackbar from 'material-ui/Snackbar';

class RegisterIndex extends Component {

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
                  type={field.type}
              />
          </div>
      );
  }

  onSubmit(values) {
    this.props.authRegister(values, (resp) => {
      this.props.history.push("/");
    });
  }

  render() {
    const { handleSubmit } = this.props;

      return(
          <Card className="registerCard">
            <CardTitle title="Register" className="registerCardTitle"/>

            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}
                  className="registerForm">

                <Field
                    label="Username"
                    name="username"
                    component={this.renderField}
                    validate={[ required ]}
                />
                <Field
                    label="Password"
                    name="password1"
                    type="password"
                    component={this.renderField}
                    validate={[ required ]}
                />

                <Field
                    label="Confirm Password"
                    name="password2"
                    type="password"
                    component={this.renderField}
                    validate={[ required ]}
                />

                <RaisedButton
                    className="registerButton"
                    type="submit"
                    primary={true}
                    label="Register"
                    fullWidth={true}
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
  form: "RegisterForm"
})(connect(mapStateToProps, { authRegister, authClearError })(RegisterIndex));