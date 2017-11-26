import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import TextField from 'material-ui/TextField';
import { Card, CardTitle } from 'material-ui/Card';

import { required } from '../validators';
import { authRegister } from '../actions/actions_auth';

import SubmitButton from './submit_button';
import { FadeIn } from './animations/fade';

import './register_index.css';

export class RegisterIndex extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

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
            onSubmit={handleSubmit(this.onSubmit)}
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
        </Card>
      </FadeIn>
    );
  }
}

export default reduxForm({
  form: 'RegisterForm',
})(connect(null, { authRegister })(RegisterIndex));
