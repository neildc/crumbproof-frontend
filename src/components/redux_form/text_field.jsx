import React from "react";
import TextField from 'material-ui/TextField';

export default function renderTextField(field) {
  const { meta: { touched, error } } = field;

  return (
    <div>
      <TextField
          hintText=""
          floatingLabelText={field.label}
          errorText={touched && error}
          {...field.input}
          {...field.custom}
          type={field.type}
          style={field.style}
      />
    </div>
  );
}
