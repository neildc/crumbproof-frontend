import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { createActivity } from "../actions";
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import CPCard from './crumbproof_card.jsx'
import {required} from "../validators.js"
import TimePicker from 'material-ui/TimePicker';
import Dropzone from 'react-dropzone';
import CircularProgress from 'material-ui/CircularProgress';


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

  renderDropzone = (field) => {
    const files = field.input.value;
    return (
      <div>
        <Dropzone
          name={field.name}
          onDrop={( acceptedFiles, e ) => {
            acceptedFiles.forEach(file => {
                const reader = new FileReader();
                reader.onload = () => {
                    const fileAsBase64String = reader.result;
                    field.input.onChange(fileAsBase64String)
                };
                reader.onabort = () => console.log('file reading was aborted');
                reader.onerror = () => console.log('file reading has failed');

                reader.readAsDataURL(file);
            });
            }
          }
        >
          <div>Upload your crumb shot!</div>
        </Dropzone>
        {field.meta.touched &&
          field.meta.error &&
          <span className="error">{field.meta.error}</span>}
        {files && Array.isArray(files) && (
          <ul>
            { files.map((file, i) => <li key={i}>{file.name}</li>) }
          </ul>
        )}
      </div>
    );
  }


  onSubmit(values) {
    return this.props.createActivity(values, () => {
      this.props.history.push("/activity");
    });
  }

  render() {
    const { handleSubmit, submitting } = this.props;

    return (
      <CPCard title={"New Activity"}>
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
              label="Photo of crumb"
              name="crumb_shot"
              component={this.renderDropzone}
            />
            <Field
              label="Notes for next time"
              name="notes"
              component={this.renderField}
            />
            <Field
              label="Started"
              name="started"
              initialValues={new Date()}
              component={this.renderTimePicker}
            />

            <Field
              label="Completed"
              name="completed"
              component={this.renderTimePicker}
            />
            <Field
              label="Time put into oven"
              name="oven_start"
              component={this.renderTimePicker}
            />
            <Field
              label="Time pulled out of oven"
              name="oven_end"
              component={this.renderTimePicker}
            />
            <div style={{marginTop: 12, display:"flex", flexDirection:"row", alignContent:"center"}}>
              <RaisedButton
                label={submitting ? 'Uploading...':'Submit'}
                disabled={submitting}
                type={'submit'}
                primary={true}
              />
              {submitting &&
                <CircularProgress style={{marginLeft:"10px", marginTop:"5px"}}
                                  size={25}
                                  thickness={3}/>
              }
            </div>
          </form>
      </CPCard>
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
