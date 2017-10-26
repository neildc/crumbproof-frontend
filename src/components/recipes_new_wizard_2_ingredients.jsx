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

const renderIngredients = ({ fields, meta: { error } }) => (

  <ul style={{listStyle:"none"}}>
    {fields.map((ingredient, index) =>
      <li key={index}>
        <div style={{display:"flex", flexDirection:"row"}}>
          <h4>Ingredient #{index + 1}</h4>
          <IconButton
            tooltip="Remove ingredient"
            style={{marginLeft:"10px"}}
            onClick={() => fields.remove(index)}>
            <DeleteIcon/>
          </IconButton>
        </div>
        <Field
          label="Name of Ingredient"
          name={`${ingredient}.name`}
          type="text"
          component={renderTextField}
          validate={[ required ]}
        />
        <Field
          label="Quantity"
          name={`${ingredient}.quantity`}
          component={renderTextField}
          type="number"
          validate={[ required, isNumber ]}
        />
        <Field
          label="Unit"
          name={`${ingredient}.unit`}
          component={renderTextField}
          validate={[ required ]}
        />
      </li>
    )}
    <RaisedButton type="button" onClick={() => fields.push({})} label="Add Ingredient"/>

    {fields.length === 0 &&
     <Paper style={{padding:"15px", margin:"20px", backgroundColor:"#bbb", color:"white"}} zDepth={4}>
       ↑ Please add at least 1 ingredient to continue
     </Paper>
    }
  </ul>
)

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
