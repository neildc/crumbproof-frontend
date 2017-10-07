import React, { Component } from "react";
import { Field, reduxForm , FieldArray } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createRecipe } from "../actions";
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import CP_Card from './crumbproof_card.jsx'
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui/svg-icons/content/remove-circle'


class RecipesNew extends Component {
  renderField(field) {
    const { meta: { touched, error } } = field;

    return (
      <div>
        <TextField
            hintText=""
            floatingLabelText={field.label}
            errorText={touched && error}
            {...field.input}
            {...field.custom}
        />
      </div>
    );
  }

  renderIngredients = ({ fields }) => (
    <ul>
      <li>
        <RaisedButton type="RaisedButton" onClick={() => fields.push({})}>Add Ingredient</RaisedButton>
      </li>
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
            label="Ingredient"
            name={`${ingredient}.name`}
            type="text"
            component={this.renderField}
            validate={[ required ]}
            />
          <Field
            label="Quantity"
            name={`${ingredient}.quantity`}
            type="text"
            component={this.renderField}
            validate={[ required, isNumber ]}
            />
          <Field
            label="Unit"
            name={`${ingredient}.unit`}
            type="text"
            component={this.renderField}
            validate={[ required ]}
            />
        </li>
      )}
    </ul>
  )

  renderSteps= ({ fields }) => (
    <ul>
      <li>
        <RaisedButton type="button" onClick={() => fields.push({})}>Add Step</RaisedButton>
      </li>
      {fields.map((step, index) =>
        <li key={index}>
          <div style={{display:"flex", flexDirection:"row"}}>
            <Field
              label={`Step ${index + 1}`}
              name={`${step}.content`}
              type="text"
              component={this.renderField}
              />
            <IconButton
              tooltip="Remove step"
              style={{marginLeft:"10px"}}
              onClick={() => fields.remove(index)}>
              <DeleteIcon/>
            </IconButton>
          </div>
        </li>
      )}
    </ul>
  )

  onSubmit(values) {
    this.props.createRecipe(values, () => {
      this.props.history.push("/");
    });
  }


  render() {
    const { handleSubmit } = this.props;

    let formstyle = {
        margin: '20px',
    };

    let buttonStyle = {
        marginBottom: '20px',
    }


    return (
        <CP_Card title={"New Recipe"}>
        <form
            onSubmit={handleSubmit(this.onSubmit.bind(this))}
            style={formstyle}>

                <Field
                    label="Name For Recipe"
                    name="name"
                    component={this.renderField}
                    validate={[ required ]}
                />
                <Field
                    label="Prep Time (minutes)"
                    name="prep_time"
                    component={this.renderField}
                    validate={[ required, isNumber ]}
                />
                <Field
                    label="Bake Time (minutes)"
                    name="bake_time"
                    component={this.renderField}
                    validate={[ required, isNumber ]}
                />
                <Field
                    label="Oven Temperature (°C)"
                    name="oven_temperature"
                    component={this.renderField}
                    validate={[ required, isNumber ]}
                />
                <Field
                    label="Yield Count"
                    name="yield_count"
                    component={this.renderField}
                    validate={[ required, isNumber ]}
                />
                <Field
                    label="Yield Type"
                    name="yield_type"
                    component={this.renderField}
                    validate={[ required ]}
                />

                <FieldArray name="ingredients" component={this.renderIngredients}/>
                <FieldArray name="steps" component={this.renderSteps}/>

                <RaisedButton
                    type="submit"
                    primary={true}
                    style={buttonStyle}>
                        Submit
                </RaisedButton>
                <Link to="/">
                    <RaisedButton>Cancel</RaisedButton>
                </Link>
            </form>
        </CP_Card>
    );
  }
}

function validate(values) {
  // console.log(values) -> { title: 'asdf', categories: 'asdf', content: 'asdf' }
  const errors = {};

  // Validate the inputs from 'values'
  if (!values.name) {
    errors.name = "Enter a name";
  }

  // If errors is empty, the form is fine to submit
  // If errors has *any* properties, redux form assumes form is invalid
  return errors;
}

export default reduxForm({
  validate,
  form: "RecipesNewForm"
})(connect(null, { createRecipe })(RecipesNew));
