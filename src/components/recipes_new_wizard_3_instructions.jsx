import React from 'react'
import { Field, FieldArray, reduxForm } from 'redux-form'
import {required, isNumber } from "../validators.js";
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui/svg-icons/content/remove-circle'
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import renderTextField from "./redux_form_textfield"
import Paper from 'material-ui/Paper';
import { RECIPE_NEW_FORM_NAME } from '../constants/form_names';

const renderInstructions = ({ fields }) => (
  <ul>
    {fields.map((step, index) =>
        <div style={{display:"flex", flexDirection:"row"}}>
          <Field
            label={`Step ${index + 1}`}
            name={`${step}.content`}
            type="text"
            validation={[required]}
            component={renderTextField}
          />
          <Field
            label={"Amount of time till next step (minutes)"}
            name={`${step}.time_gap_to_next`}
            style={{marginLeft:"10px"}}
            validation={[isNumber]}
            type="number"
            component={renderTextField}
          />
          <IconButton
            tooltip="Remove step"
            style={{marginLeft:"10px"}}
            onClick={() => fields.remove(index)}>
            <DeleteIcon/>
          </IconButton>
        </div>
    )}
    <RaisedButton type="button" onClick={() => fields.push({})} label="Add Step"/>

    {fields.length === 0 &&
     <Paper style={{padding:"15px", margin:"20px", backgroundColor:"#bbb", color:"white"}} zDepth={4}>
       ↑ Please add at least 1 instruction to continue
     </Paper>
    }
  </ul>
)


class RecipesNewWizard3Instructions extends React.Component {

  render() {
    const { handleSubmit, previousPage } = this.props;
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
          <RaisedButton
            label={"Submit"}
            type={"submit"}
            primary={true}
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
