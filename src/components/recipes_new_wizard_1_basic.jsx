import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {required, isNumber } from "../validators.js";
import RaisedButton from 'material-ui/RaisedButton';
import { RECIPE_NEW_FORM_NAME } from '../constants/form_names';
import renderTextField from "./redux_form/text_field";
import renderAutoComplete from './redux_form/auto_complete';


const RecipesNewWizard1Basic = (props) => {

  const { handleSubmit } = props

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Field
          label="Name For Recipe"
          name="name"
          component={renderTextField}
          validate={[ required ]}
        />

        <Field
          label="Credit/Source (optional)"
          name="credits"
          component={renderTextField}
          validate={[]}
        />

        <Field
          label="Bake Time (minutes)"
          name="bake_time"
          type="number"
          component={renderTextField}
          validate={[ required, isNumber ]}
        />

        <Field
          label="Oven Temperature (°C)"
          name="oven_temperature"
          type="number"
          component={renderTextField}
          validate={[ required, isNumber ]}
        />

        <Field
          label="Yield Count"
          name="yield_count"
          type="number"
          component={renderTextField}
          validate={[ required, isNumber ]}
        />
        <Field
          label="Yield Type"
          name="yield_type"
          suggestions ={['Loaf', 'Baguette', 'Roll', 'Bun', 'Bagel']}
          component={renderAutoComplete}
          validate={[ required ]}
        />
      </div>
      <div style={{marginTop: 12}}>
        <RaisedButton
          label={"Next"}
          type={"submit"}
          primary={true}
        />
      </div>
    </form>
  )
}

export default reduxForm({
  form: RECIPE_NEW_FORM_NAME,
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(RecipesNewWizard1Basic)
