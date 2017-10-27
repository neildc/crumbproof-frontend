import React from "react";
import AutoComplete from 'material-ui/AutoComplete';

export default function renderAutoComplete(field) {
  const { meta: { touched, error } } = field;

  return (
    <div>
      <AutoComplete
        hintText=""
        floatingLabelText={field.label}
        errorText={touched && error}
        {...field.custom}
        openOnFocus={true}
        dataSource={field.suggestions}
        filter={AutoComplete.fuzzyFilter}
        maxSearchResults={3}
        searchText={field.input.value}
        onUpdateInput={(value) => {field.input.onChange(value)}}
    />
    </div>
  );
}
