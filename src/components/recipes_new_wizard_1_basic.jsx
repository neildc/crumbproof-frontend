import React from 'react';
import { Field, reduxForm } from 'redux-form';

import RaisedButton from 'material-ui/RaisedButton';

import renderTextField from './redux_form/text_field';
import renderAutoComplete from './redux_form/auto_complete';

import { RECIPE_NEW_FORM_NAME } from '../constants/form_names';
import { required, isNumber } from '../validators';

const RecipesNewWizard1Basic = (props) => {
  const { handleSubmit } = props;

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Field
          label="Name For Recipe"
          name="name"
          component={renderTextField}
          validate={[required]}
          style={{ margin: '0 10px ' }}
        />

        <Field
          label="Credit/Source (optional)"
          name="credits"
          component={renderTextField}
          validate={[]}
          style={{ margin: '0 10px ' }}
        />

        <Field
          label="Ideal room temperature (°C)"
          name="room_temperature"
          type="number"
          component={renderTextField}
          validate={[isNumber]}
          style={{ margin: '0 10px ' }}
        />

        <Field
          label="Yield Count"
          name="yield_count"
          type="number"
          component={renderTextField}
          validate={[required, isNumber]}
          style={{ margin: '0 10px ' }}
        />
        <Field
          label="Yield Type"
          name="yield_type"
          suggestions={['Loaf', 'Baguette', 'Roll', 'Bun', 'Bagel']}
          component={renderAutoComplete}
          validate={[required]}
          style={{ margin: '0 10px ' }}
        />
      </div>
      <div style={{ marginTop: 12 }}>
        <RaisedButton
          label="Next"
          type="submit"
          primary
        />
      </div>
    </form>
  );
};

export default reduxForm({
  form: RECIPE_NEW_FORM_NAME,
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(RecipesNewWizard1Basic);
