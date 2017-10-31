import React from 'react'
import { FieldArray, reduxForm } from 'redux-form'
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { RECIPE_NEW_FORM_NAME } from '../constants/form_names';
import renderIngredients from './redux_form/ingredients_list';


const RecipesNewWizard2Ingredients = (props) => {
  const { handleSubmit, previousPage } = props
  return (
    <form onSubmit={handleSubmit}>

      <div>
        <FieldArray name="ingredients" component={renderIngredients}/>
      </div>

      <div style={{marginTop: 12}}>
        <FlatButton
          label="Back"
          onClick={previousPage}
          style={{marginRight: 12}}
        />
        <RaisedButton
          label={"Next"}
          type={"submit"}
          primary={true}
        />
      </div>
    </form>
  )
}

function validate(values) {
  const errors = {};
  if (!values.ingredients || !values.ingredients.length) {
    errors.ingredients = { _error: 'At least one ingredient must be entered' }
  }

  return errors;
}

export default reduxForm({
  form: RECIPE_NEW_FORM_NAME,
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate
})(RecipesNewWizard2Ingredients)
