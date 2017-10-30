import React, {Component} from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import _ from "lodash";
import Diff from "./diff";
import { fetchRecipe } from "../actions/actions_recipe";
import {INSTRUCTIONS, INGREDIENTS} from "../util/diff";
import LinearProgress from 'material-ui/LinearProgress';

const ingredientStr = (i) => `${i.quantity} ${i.unit} ${i.name}`;

const instructionStr = (i) => i.time_gap_to_next ?
                            `${i.content} for ${i.time_gap_to_next} mins` :
                            `${i.content}`;

class RecipeDiff extends Component {

  componentDidMount() {
    if (this.props.recipe.diff && !this.props.parentRecipe) {
      this.props.fetchRecipe(this.props.recipe.parent);
    }
  }

renderIngredients () {
  return _.map(this.props.recipe.data.ingredients, i => {
    return(
      <li key={i.id}>
        {ingredientStr(i)}
      </li>
    );
  })
}

renderInstructions () {
  return _.map(this.props.recipe.data.instructions, i => {
      return(
        <li key={i.step_number}>
          {instructionStr(i)}
        </li>
      );
    })
  }

  renderDiff(type) {

    let toString = {
      [INGREDIENTS] : ingredientStr,
      [INSTRUCTIONS] : instructionStr
    }

    let key = {
      [INGREDIENTS] : "id",
      [INSTRUCTIONS] : "step_number",
    }

    let original = this.props.recipe[type];
    let modified = _.mapKeys(this.props.modifications[type].modified, key[type]);
    let removed = _.mapKeys(this.props.modifications[type].removed, key[type]);
    let added = this.props.modifications[type].added

    let all =_.sortBy(_.concat(original, added), key[type]);
    // Ensure that we map keys only AFTER we concat
    // Otherwise we get invalid array keys when concating
    //    - Negative ints for ingredients
    //    - Decimal values for instructions

    added = _.mapKeys(this.props.modifications[type].added, key[type]);

    return _.map(all, i => {
      let lookupKey = i[key[type]];

      if (added[lookupKey]) {
        return (
          <li key={lookupKey}>
            <Diff inputB={toString[type](i)} />
          </li>
        )
      }

      if (modified[lookupKey]) {
        return (
          <li key={lookupKey}>
            <Diff inputA={toString[type](i)}
                  inputB={toString[type](modified[lookupKey])}
            />
          </li>
        )
      }

      if (removed[lookupKey]) {
        return (
          <li key={lookupKey}>
            <Diff inputA={toString[type](i)} />
          </li>
        )
      }


      return (
        <li key={lookupKey}>
          {toString[type](i)}
        </li>
      );
    });
  };

  render(){


    let { diff } = this.props.recipe

    if (diff && !this.props.parentRecipe) {
      return <LinearProgress mode="indeterminate" />;
    }

    return(

      <div>
        <b>Ingredients:</b>
        <ul>
        {this.props.modifications.ingredients ? this.renderDiff(INGREDIENTS) :
                                                this.renderIngredients()
        }
        </ul>

        <br/>

        <b>Instructions:</b>
        <ol>
        {this.props.modifications.instructions ? this.renderDiff(INSTRUCTIONS) :
                                                 this.renderInstructions()
        }
        </ol>
      </div>
    );

  }

}

RecipeDiff.proptypes = {
  recipe: PropTypes.object.required,
}

function mapStateToProps({ recipes }, ownProps) {

  let parentRecipe = ownProps.recipe.parent

  if (!parentRecipe) {return {}}

  if (!recipes[parentRecipe]) {return {}}

  return {
    parentRecipe: recipes[parentRecipe]
  };
}

export default connect(mapStateToProps, { fetchRecipe })(RecipeDiff);
