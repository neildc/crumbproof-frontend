import React from 'react'
import { connect } from "react-redux";
import { createRecipe } from "../actions";
import { Field, FieldArray, reduxForm } from 'redux-form'
import {required, isNumber } from "../validators.js";
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui/svg-icons/content/remove-circle'
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import renderTextField from "./redux_form_textfield"

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

    }
  </ul>
)


class RecipesNewWizard3Instructions extends React.Component {

  onSubmit(values) {

    /* TODO: debug why this is happening
      *
      *       Currently whenever we navigate to the third/last/instruction part of
      *       Stepper, the form automatically submits
      *
      *       The main difference in this step in the stepper is that the right button
      *       has type=submit rather than type=button
      */
    if (!values.instructions) {
      // Returning false for now here prevents the form from submitting
      // automatically
      return false;
    }

    this.props.createRecipe(values, () => {
      this.props.history.push("/");
    });
  }

  render() {
    const { handleSubmit, previousPage } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
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
            label={"Next"}
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

  return errors;
}

export default reduxForm({
  form: 'RecipesNewForm',  //Form name is same
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate
})(connect(null, { createRecipe })(RecipesNewWizard3Instructions));
