import _ from "lodash";
import React, { Component } from "react";
import { Field, FieldArray, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { createActivity } from "../actions/actions_activity";
import { fetchRecipe } from "../actions/actions_recipe";
import CPCard from './crumbproof_card.jsx'
import {required, isNumber} from "../validators.js"
import TimePicker from 'material-ui/TimePicker';
import LinearProgress from 'material-ui/LinearProgress';
import SubmitButton from "./SubmitButton";
import renderTextField from "./redux_form/text_field";
import renderAutoComplete from "./redux_form/auto_complete";
import renderIngredients from "./redux_form/ingredients_list";
import renderInstructions from "./redux_form/instructions_list";
import renderDropzone from "./redux_form/drop_zone";

import {getModifications, INSTRUCTIONS, INGREDIENTS} from "../util/diff";

class ActivityNew extends Component {

  componentDidMount() {
    const { recipeId } = this.props.match.params;
    if (recipeId && !this.props.initialValues) {
      this.props.fetchRecipe(recipeId);
    }
  }

  renderRecipeEditor() {
    if (!this.props.initialValues) {
      return(
        <div style={{padding:"10px"}}>
          Loading recipe...
          <LinearProgress mode="indeterminate" />
        </div>
      )
    }

    return (
      <div>
        <h3>Recipe used: {this.props.initialValues.name}</h3>
        <h4>Modifications:</h4>
        <Field
          label="Name of Recipe"
          name="name"
          component={renderTextField}
          validate={[ required ]}
        />
        <Field
          label="Bake Time (minutes)"
          name="bake_time"
          type="number"
          component={renderTextField}
          validate={[ required, isNumber ]}
        />

        <Field
          label="Oven Temperature (°C)"
          name="oven_temperature"
          type="number"
          component={renderTextField}
          validate={[ required, isNumber ]}
        />

        <Field
          label="Yield Count"
          name="yield_count"
          type="number"
          component={renderTextField}
          validate={[ required, isNumber ]}
        />
        <Field
          label="Yield Type"
          name="yield_type"
          suggestions ={['Loaf', 'Baguette', 'Roll', 'Bun', 'Bagel']}
          component={renderAutoComplete}
          validate={[ required ]}
        />

        <div>
          <FieldArray name="ingredients" component={renderIngredients}/>
          <br/>
          <FieldArray name="instructions" component={renderInstructions}/>
          <br/>
        </div>

      </div>
    );
  }

  renderTimePicker = (field) => {
    return (
      <div >
        {field.label}
        <TimePicker
          hintText={"Please enter a time"}
          onChange={(notUsed, time) => {
              field.input.onChange(time);
          }}
        />
      </div>
    );
  }

  onSubmit(values) {

    var payload = {
      name: values.activity_name,
      crumb_shot:  values.crumb_shot
    };

    if (values.notes) {
      _.assign(payload, { notes: values.notes })
    };

    const { recipeId } = this.props.match.params;
    if (recipeId) {

      let modifications = {
        ingredients: getModifications(
                        INGREDIENTS,
                        this.props.initialValues.ingredients,
                        values.ingredients),

        instructions: getModifications(
                        INSTRUCTIONS,
                        this.props.initialValues.instructions,
                        values.instructions)
      }

      let newRecipe = {
        bake_time : values.bake_time,
        name: values.name,
        instructions: values.instructions,
        ingredients: values.ingredients,
        oven_temperature: values.oven_temperature,
        yield_count: values.yield_count,
        yield_type: values.yield_type
      }

      let base = this.props.recipe.base_recipe ? this.props.recipe.base_recipe : this.props.recipe.id;

      _.assign(payload, { recipe: {
                 diff: modifications,
                 data: newRecipe,
                 base_recipe : base,
                 parent: recipeId,
               }}

      );
    }

    return this.props.createActivity(payload, () => {
      this.props.history.push("/activity");
    });
  }

  render() {
    const { handleSubmit, submitting } = this.props;

    return (
      <CPCard title={"New Activity"}>
        <form
          onSubmit={handleSubmit(this.onSubmit.bind(this))}
          style={{margin:"20px"}}
        >
          <Field
            label="Name For Activity"
            name="activity_name"
            component={renderTextField}
            validate={[ required ]}
          />
          <Field
            label="Photo of crumb"
            name="crumb_shot"
            component={renderDropzone}
          />
          <Field
            label="Notes"
            name="notes"
            multiLine={true}
            fullWidth={true}
            component={renderTextField}
          />

          {this.props.match.params.recipeId &&
            this.renderRecipeEditor()
          }

          <SubmitButton
            label="Submit"
            labelInProgress="Submitting..."
            submittingFlag={submitting}
          />

        </form>
      </CPCard>
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

function mapStateToProps({recipes}, ownProps) {

  const { recipeId } = ownProps.match.params;

  if (!recipeId) {
    return {};
  }

  let recipe = recipes[recipeId];

  if (!recipe) {
    return {}
  } else {
    return {
      initialValues: {
        ...recipe.data,
      },
      recipe
    };
  }

}

export default connect(mapStateToProps, { createActivity, fetchRecipe })(
  reduxForm({
    form: "ActivityNewForm",
    validate
  })(ActivityNew)
)
