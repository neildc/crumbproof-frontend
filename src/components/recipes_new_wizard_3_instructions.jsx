import React from 'react'
import { FieldArray, reduxForm } from 'redux-form'
import FlatButton from 'material-ui/FlatButton';
import renderInstructions from "./redux_form/instructions_list";
import { RECIPE_NEW_FORM_NAME } from '../constants/form_names';
import SubmitButton from "./SubmitButton";


class RecipesNewWizard3Instructions extends React.Component {

  render() {
    const { handleSubmit, previousPage, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <FieldArray name="instructions" component={renderInstructions}/>
        </div>

        <div style={{marginTop: 12}}>
          <FlatButton
            label="Back"
            onClick={previousPage}
            style={{marginRight: 12}}
          />

          <SubmitButton
            label="Submit Recipe"
            labelInProgress="Submiting..."
            submittingFlag={submitting}
          />

        </div>
      </form>
    )
  }
}

function validate(values) {
  const errors = {};
  if (!values.instructions || !values.instructions.length) {
    errors.instructions = { _error: 'At least one instruction must be entered' }
  }

  return errors;
}

export default reduxForm({
  form: RECIPE_NEW_FORM_NAME,
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate
})(RecipesNewWizard3Instructions)
