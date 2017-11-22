import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { Card, CardTitle } from 'material-ui/Card';

import { authLogin } from '../actions/actions_auth';

import SubmitButton from './submit_button';
import { FadeIn } from './animations/fade';
import { required } from '../validators';

import './login_index.css';

export class LoginIndex extends Component {
  renderField(field) {
    const { meta: { touched, error } } = field;

    return (
      <div>
        <TextField
          style={{ width: 'auto' }}
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
    return this.props.authLogin(values, () => {
      this.props.history.push('/');
    });
  }

  render() {
    const { handleSubmit, submitting } = this.props;

    return (
      <FadeIn>
        <Card className="loginCard">
          <CardTitle title="Login" className="loginCardTitle" />

          <form
            onSubmit={handleSubmit(this.onSubmit.bind(this))}
            className="loginForm"
          >

            <Field
              label="Username"
              name="username"
              component={this.renderField}
              validate={[required]}
            />
            <Field
              label="Password"
              name="password"
              type="password"
              component={this.renderField}
              validate={[required]}
            />

            <SubmitButton
              className="loginButton"
              label="Login"
              labelInProgress="Logging in..."
              submittingFlag={submitting}
              fullWidth
            />
            <RaisedButton
              type="button"
              label="Register"
              fullWidth
              containerElement={<Link to="/register" />}
            />
          </form>
        </Card>
      </FadeIn>
    );
  }
}

export default reduxForm({
  form: 'LoginForm',
})(connect(null, { authLogin })(LoginIndex));
