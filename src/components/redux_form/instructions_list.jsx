import React from 'react';
import './instructions_list.css';
import { Field } from 'redux-form';
import { required, isNumber } from '../../validators.js';
import renderTextField from './text_field';

import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui/svg-icons/content/remove-circle';
import ReturnIcon from 'material-ui/svg-icons/hardware/keyboard-return';
import RaisedButton from 'material-ui/RaisedButton';
import UpArrowIcon from 'material-ui/svg-icons/navigation/arrow-drop-up';

function renderButtons(index, fields) {
  if (window.innerWidth > 640) {
    return (
      <div className="instructionButtons">
        <IconButton
          tooltip={`Add step below step ${index + 1}`}
          style={{ marginLeft: '10px' }}
          onClick={() => fields.insert(index + 1)}
        >
          <ReturnIcon />
        </IconButton>

        <IconButton
          tooltip={`Remove step ${index + 1}`}
          style={{ marginLeft: '5px' }}
          onClick={() => fields.remove(index)}
        >
          <DeleteIcon />
        </IconButton>
      </div>
    );
  }
  return (
    <div>
      <RaisedButton
        icon={<UpArrowIcon />}
        label={`Remove ${index + 1}`}
        onClick={() => fields.remove(index)}
      />

      <RaisedButton
        icon={<ReturnIcon />}
        label="Add"
        style={{ marginLeft: '5px' }}
        onClick={() => fields.insert(index + 1)}
      />

    </div>
  );
}

function renderInstruction(step, index, fields) {
  return (
    <li key={index}>
      <div className="instructionForm">
        <Field
          label={`Step ${index + 1}`}
          name={`${step}.content`}
          multiLine
          type="text"
          validation={[required]}
          component={renderTextField}
        />
        <Field
          label="Duration (mins)"
          name={`${step}.time_gap_to_next`}
          className="instructionDuration"
          validation={[isNumber]}
          type="number"
          component={renderTextField}
        />

        {renderButtons(index, fields)}

      </div>
    </li>
  );
}

export default function renderInstructions({ fields }) {
  return (

    <ul style={{ listStyle: 'none', padding: '0px' }}>

      {fields.map((step, index) =>
        renderInstruction(step, index, fields))}

      <RaisedButton
        className="instructionAddButton"
        type="button"
        onClick={() => fields.push({})}
        label="Add Step"
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

         ↑ Please add at least 1 instruction to continue
      </Paper>
      }
    </ul>
  );
}
