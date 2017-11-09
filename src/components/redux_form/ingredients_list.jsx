import React from 'react';
import { Field } from 'redux-form';

import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import DeleteIcon from 'material-ui/svg-icons/content/remove-circle';
import UpArrowIcon from 'material-ui/svg-icons/navigation/arrow-drop-up';

import renderAutoComplete from './auto_complete';
import renderTextField from './text_field';

import { required, isNumber } from '../../validators';

import './ingredients_list.css';

function renderRemoveButton(fields, index) {
  if (window.innerWidth > 640) {
    return (
      <div className="ingredientRemoveButton">
        <IconButton
          tooltip={`Remove ingredient #${index + 1}`}
          onClick={() => fields.remove(index)}
        >
          <DeleteIcon />
        </IconButton>
      </div>
    );
  }
  return (
    <RaisedButton
      icon={<UpArrowIcon />}
      label={`Remove ingredient #${index + 1}`}
      labelPosition="before"
      onClick={() => fields.remove(index)}
    />
  );
}

function renderIngredient(ingredient, index, fields) {
  return (
    <li key={index}>
      <div className="ingredientFields">
        <Field
          className="ingredientName"
          label={`Ingredient #${index + 1}`}
          name={`${ingredient}.name`}
          type="text"
          component={renderTextField}
          validate={[required]}
        />
        <Field
          className="ingredientQuantity"
          label="Quantity"
          name={`${ingredient}.quantity`}
          component={renderTextField}
          type="number"
          validate={[required, isNumber]}
        />
        <Field
          className="ingredientUnit"
          label="Unit"
          name={`${ingredient}.unit`}
          suggestions={['mL', 'g', 'kg', 'mg', 'L', 'cup', 'teaspoon', 'tablespoon']}
          component={renderAutoComplete}
          validate={[required]}
        />
        {renderRemoveButton(fields, index)}
      </div>
    </li>
  );
}

export default function renderIngredients({ fields, meta: { error } }) {
  return (
    <ul style={{ listStyle: 'none', padding: '0px' }}>

      {fields.map((ingredient, index) =>
        renderIngredient(ingredient, index, fields))}

      <RaisedButton
        className="addIngredientButton"
        type="button"
        onClick={() => fields.push({})}
        label="Add Ingredient"
      />

      {fields.length === 0 &&
      <Paper
        style={{
padding: '15px',
                      margin: '20px',
                      backgroundColor: '#bbb',
                      color: 'white',
}}
        zDepth={4}
      >

         ↑ Please add at least 1 ingredient to continue
      </Paper>
      }
    </ul>
  );
}
