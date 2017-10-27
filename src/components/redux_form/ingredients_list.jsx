import React from "react";
import { Field } from 'redux-form'
import {required, isNumber } from "../../validators.js";

import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui/svg-icons/content/remove-circle'
import RaisedButton from 'material-ui/RaisedButton';
import renderTextField from "./text_field";
import renderAutoComplete from './auto_complete';
import Paper from 'material-ui/Paper';

function renderIngredient(ingredient, index, fields) {
  return(
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
        suggestions={['mL', 'g', 'kg', 'mg', 'L', 'cup', 'teaspoon', 'tablespoon']}
        component={renderAutoComplete}
        validate={[ required ]}
      />
    </li>
  );
}

export default function renderIngredients ({ fields, meta: { error } })  {

  return(
    <ul style={{listStyle:"none", padding:"0px"}}>

      {fields.map((ingredient, index) =>
        renderIngredient(ingredient, index, fields)
      )}

      <RaisedButton
        type="button"
        onClick={() => fields.push({})}
        label="Add Ingredient"
      />

      {fields.length === 0 &&
       <Paper style={{padding:"15px",
                      margin:"20px",
                      backgroundColor:"#bbb",
                      color:"white"}}
              zDepth={4}>

         ↑ Please add at least 1 ingredient to continue
       </Paper>
      }
    </ul>
  );
}
