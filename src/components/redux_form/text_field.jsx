import React from "react";
import TextField from 'material-ui/TextField';

export default function renderTextField(field) {
  const { meta: { touched, error } } = field;

  return (
    <TextField
      {...field}
      {...field.input}
      {...field.custom}
      hintText=""
      floatingLabelText={field.label}
      errorText={touched && error}
    />
  );
}
