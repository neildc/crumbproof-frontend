import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {required, isNumber } from "../validators.js";
import RaisedButton from 'material-ui/RaisedButton';
import renderTextField from "./redux_form_textfield";
import { RECIPE_NEW_FORM_NAME } from '../constants/form_names';

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
          label="Bake Time (minutes)"
          name="bake_time"
          type="number"
          component={renderTextField}
          parse={value => Number(value)}
          validate={[ required, isNumber ]}
        />

        <Field
          label="Oven Temperature (°C)"
          name="oven_temperature"
          type="number"
          component={renderTextField}
          parse={value => Number(value)}
          validate={[ required, isNumber ]}
        />

        <Field
          label="Yield Count"
          name="yield_count"
          type="number"
          component={renderTextField}
          parse={value => Number(value)}
          validate={[ required, isNumber ]}
        />
        <Field
          label="Yield Type"
          name="yield_type"
          component={renderTextField}
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
