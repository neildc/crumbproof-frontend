
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
          <Card style={{width:"50%", height:"50%", margin:"0 auto", textAlign:"center", }}>
          <CardTitle title="Login" style={{textAlign:"Left",backgroundColor:"#eee"}}/>
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))} style={{padding:"50px"}}>

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
                    type="submit"
                    primary={true}
                    label="Login"
                    style={{marginBottom:"20px", marginTop:"20px"}}>

                </RaisedButton>
                <Link to="/">
                    <RaisedButton>Cancel</RaisedButton>
                </Link>
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
