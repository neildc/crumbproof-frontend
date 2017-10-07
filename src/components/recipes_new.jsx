import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createRecipe } from "../actions";
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';



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
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))} style={formstyle}>
            <Field
                label="Title For Recipe"
                name="title"
                component={this.renderField}
            />
            <Field
                label="Categories"
                name="categories"
                component={this.renderField}
            />
            <Field
                label="Recipe Content"
                name="content"
                component={this.renderField}
            />
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
        <CP_Card title={"New Recipe"}>
        </CP_Card>
    );
  }
}

function validate(values) {
  // console.log(values) -> { title: 'asdf', categories: 'asdf', content: 'asdf' }
  const errors = {};

  // Validate the inputs from 'values'
  if (!values.title) {
    errors.title = "Enter a title";
  }
  if (!values.categories) {
    errors.categories = "Enter some categories";
  }
  if (!values.content) {
    errors.content = "Enter some content please";
  }

  // If errors is empty, the form is fine to submit
  // If errors has *any* properties, redux form assumes form is invalid
  return errors;
}

export default reduxForm({
  validate,
  form: "RecipesNewForm"
})(connect(null, { createRecipe })(RecipesNew));
