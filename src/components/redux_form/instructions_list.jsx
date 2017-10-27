import React from 'react'
import { Field } from 'redux-form'
import {required, isNumber } from "../../validators.js";
import renderTextField from "./text_field";

import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui/svg-icons/content/remove-circle'
import RaisedButton from 'material-ui/RaisedButton';

function renderInstruction (step, index, fields) {
  return(
    <li key={index}>
      <div style={{display:"flex", flexDirection:"row"}}>
        <Field
          label={`Step ${index + 1}`}
          name={`${step}.content`}
          type="text"
          validation={[required]}
          component={renderTextField}
        />
        <Field
          label={"Duration (mins)"}
          name={`${step}.time_gap_to_next`}
          style={{marginLeft:"30px", width:"50%"}}
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
    </li>
  );
}

export default function renderInstructions ({ fields }) {
  return (
    <ul style={{listStyle:"none"}}>

      {fields.map((step, index) =>
        renderInstruction(step, index, fields)
      )}

      <RaisedButton
        type="button"
        onClick={() => fields.push({})}
        label="Add Step"
      />

      {fields.length === 0 &&
       <Paper style={{padding:"15px",
                      margin:"20px",
                      backgroundColor:"#bbb",
                      color:"white"}}
              zDepth={4}>

         ↑ Please add at least 1 instruction to continue
       </Paper>
      }
    </ul>
  )
}
