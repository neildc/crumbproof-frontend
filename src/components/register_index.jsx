import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import Snackbar from 'material-ui/Snackbar';
import TextField from 'material-ui/TextField';
import { Card, CardTitle } from 'material-ui/Card';

import { required } from '../validators';
import { authRegister, authClearError } from '../actions/actions_auth';

import SubmitButton from './submit_button';
import { FadeIn } from './animations/fade';

import './register_index.css';

export class RegisterIndex extends Component {
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
    return this.props.authRegister(values, () => {
      this.props.history.push('/');
    });
  }

  render() {
    const { handleSubmit, submitting } = this.props;

    return (
      <FadeIn>
        <Card className="registerCard">
          <CardTitle title="Register" className="registerCardTitle" />

          <form
            onSubmit={handleSubmit(this.onSubmit.bind(this))}
            className="registerForm"
          >

            <Field
              label="Username"
              name="username"
              component={this.renderField}
              validate={[required]}
            />
            <Field
              label="Password"
              name="password1"
              type="password"
              component={this.renderField}
              validate={[required]}
            />

            <Field
              label="Confirm Password"
              name="password2"
              type="password"
              component={this.renderField}
              validate={[required]}
            />

            <SubmitButton
              className="registerButton"
              submittingFlag={submitting}
              label="Register"
              labelInProgress="Registering..."
              fullWidth
            />

          </form>

          <Snackbar
            open={this.props.error != null}
            message={this.props.error ? this.props.error : ''}
            autoHideDuration={5000}
            style={{ backgroundColor: 'red' }}
            onRequestClose={this.props.authClearError}
          />
        </Card>
      </FadeIn>
    );
  }
}

function mapStateToProps({ auth }, ownProps) {
  return { error: auth.error };
}

export default reduxForm({
  form: 'RegisterForm',
})(connect(mapStateToProps, { authRegister, authClearError })(RegisterIndex));
