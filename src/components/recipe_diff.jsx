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
        <li key={i.id}>
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

    let modified = _.mapKeys(this.props.recipe.diff[type].modified, 'id');
    let removed = _.mapKeys(this.props.recipe.diff[type].removed, 'id');
    let added = _.mapKeys(this.props.recipe.diff[type].added, 'id');
    }

    let original = this.props.recipe[type];

    let all =_.sortBy(_.concat(original, added), key[type]);
    // Ensure that we map keys only AFTER we concat
    // Otherwise we get invalid array keys when concating
    //    - Negative ints for ingredients
    //    - Decimal values for instructions

    added = _.mapKeys(this.props.modifications[type].added, key[type]);

    return _.map(all, i => {

      if (added[i.id]) {
        return (
          <li key={i.id}>
            <Diff inputB={toString[type](i)} />
          </li>
        )
      }

      if (modified[i.id]) {
        return (
          <li key={i.id}>
            <Diff inputA={toString[type](originalMapped[i.id])}
                  inputB={toString[type](modified[i.id])}
            />
          </li>
        )
      }

      if (removed[i.id]) {
        return (
          <p key={i.id} style={{margin:"0px"}}>
            <Diff inputA={toString[type](i)} />
          </p>
        )
      }


      return (
        <li key={i.id}>
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
        { diff && diff.ingredients ? this.renderDiff(INGREDIENTS) :
                                     this.renderIngredients()
        }
        </ul>

        <br/>

        <b>Instructions:</b>
        <ol>
        { diff && diff.instructions ? this.renderDiff(INSTRUCTIONS) :
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
