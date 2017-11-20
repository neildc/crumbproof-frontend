import _ from 'lodash';
import React, { Component } from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import LinearProgress from 'material-ui/LinearProgress';
import TimePicker from 'material-ui/TimePicker';
import Toggle from 'material-ui/Toggle';

import { fetchRecipe } from '../actions/actions_recipe';

import SubmitButton from './submit_button';
import CPCard from './crumbproof_card';

import renderTextField from './redux_form/text_field';
import renderAutoComplete from './redux_form/auto_complete';
import renderIngredients from './redux_form/ingredients_list';
import renderInstructions from './redux_form/instructions_list';
import renderDropzone from './redux_form/drop_zone';
import {
  createActivity, createActivityWithModifiedRecipe,
} from '../actions/actions_activity';

import { dateToday } from '../util/time';
import { generateDiff, INSTRUCTIONS, INGREDIENTS } from '../util/diff';
import { required, isNumber } from '../validators';

class ActivityNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe_modified: false,
    };
  }

  componentDidMount() {
    const { recipeId } = this.props.match.params;
    if (recipeId && !this.props.initialValues) {
      this.props.fetchRecipe(recipeId);
    }
  }

  renderRecipeEditor() {
    if (!this.props.initialValues) {
      return (
        <div style={{ padding: '10px' }}>
          Loading recipe...
          <LinearProgress mode="indeterminate" />
        </div>
      );
    }

    return (
      <div>
        <h4>Modifications made this iteration:</h4>
        <Field
          label="Name of this variation"
          name="name"
          fullWidth
          component={renderTextField}
          validate={[required]}
        />
        <Field
          label="Bake Time (minutes)"
          name="bake_time"
          type="number"
          component={renderTextField}
          validate={[required, isNumber]}
        />

        <Field
          label="Oven Temperature (°C)"
          name="oven_temperature"
          type="number"
          component={renderTextField}
          validate={[required, isNumber]}
        />

        <Field
          label="Yield Count"
          name="yield_count"
          type="number"
          component={renderTextField}
          validate={[required, isNumber]}
        />
        <Field
          label="Yield Type"
          name="yield_type"
          suggestions={['Loaf', 'Baguette', 'Roll', 'Bun', 'Bagel']}
          component={renderAutoComplete}
          validate={[required]}
        />

        <div>
          <br />
          <h3> Ingredients:</h3>
          <FieldArray name="ingredients" component={renderIngredients} />
          <br />
          <h3> Instructons:</h3>
          <FieldArray name="instructions" component={renderInstructions} />
        </div>

      </div>
    );
  }

  renderTimePicker(field) {
    return (
      <div >
        {field.label}
        <TimePicker
          hintText="Please enter a time"
          onChange={(notUsed, time) => {
              field.input.onChange(time);
          }}
        />
      </div>
    );
  }

  submitModifiedRecipe(values, payload, recipeId) {
    const diffs = {
      ingredients: generateDiff(
        INGREDIENTS,
        this.props.initialValues.ingredients,
        values.ingredients,
      ),

      instructions: generateDiff(
        INSTRUCTIONS,
        this.props.initialValues.instructions,
        values.instructions,
      ),
    };

    const newRecipe = {
      bake_time: values.bake_time,
      name: values.name,
      instructions: values.instructions,
      ingredients: values.ingredients,
      oven_temperature: values.oven_temperature,
      yield_count: values.yield_count,
      yield_type: values.yield_type,
    };

    const base = this.props.recipe.base_recipe ? this.props.recipe.base_recipe :
      this.props.recipe.id;

    _.assign(payload, {
      recipe: {
        diff: diffs,
        data: newRecipe,
        base_recipe: base,
        parent: recipeId,
      },
    });

    return this.props.createActivityWithModifiedRecipe(payload, () => {
      this.props.history.push('/activity');
    });
  }

  onSubmit(values) {
    const { recipeId } = this.props.match.params;

    const payload = {
      name: values.activity_name,
      crumb_shot: values.crumb_shot,
    };

    if (values.notes) {
      _.assign(payload, { notes: values.notes });
    }

    if (recipeId && this.state.recipe_modified) {
      return this.submitModifiedRecipe(values, payload, recipeId);
    }

    if (recipeId) {
      _.assign(payload, { recipe: recipeId });
    }

    return this.props.createActivity(payload, () => {
      this.props.history.push('/activity');
    });
  }

  render() {
    const { handleSubmit, submitting } = this.props;

    return (
      <CPCard title="New Activity">
        <form
          onSubmit={handleSubmit(this.onSubmit.bind(this))}
          style={{ margin: '20px' }}
        >
          <Field
            label="Name For Activity"
            name="activity_name"
            component={renderTextField}
            validate={[required]}
          />
          <Field
            label="Photo of crumb"
            name="crumb_shot"
            component={renderDropzone}
          />
          <Field
            label="Notes"
            name="notes"
            multiLine
            fullWidth
            component={renderTextField}
          />

          { this.props.match.params.recipeId && this.props.initialValues &&

            <div style={{ padding: '20px 0px' }}>
              <h3>Recipe used: {this.props.initialValues.name.replace(`(${dateToday()})`, '')}</h3>
              <Toggle
                label="Submit recipe modifications?"
                onToggle={(event, toggled) => { this.setState({ recipe_modified: toggled }); }
                }
              />

              {this.state.recipe_modified && this.renderRecipeEditor()}
            </div>
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
    errors.name = 'Enter a name';
  }

  // If errors is empty, the form is fine to submit
  // If errors has *any* properties, redux form assumes form is invalid
  return errors;
}

function mapStateToProps({ recipes }, ownProps) {
  const { recipeId } = ownProps.match.params;

  if (!recipeId) {
    return {};
  }

  const recipe = recipes[recipeId];

  if (!recipe) {
    return {};
  }
  return {
    initialValues: {
      ...recipe.data,
      name: `${recipe.data.name} (${dateToday()})`,
    },
    recipe,
  };
}

export default connect(
  mapStateToProps,
  { createActivity, createActivityWithModifiedRecipe, fetchRecipe },
)(reduxForm({
  form: 'ActivityNewForm',
  validate,
})(ActivityNew));
