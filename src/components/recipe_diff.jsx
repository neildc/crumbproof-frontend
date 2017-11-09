import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Diff from './diff';
import { fetchRecipe } from '../actions/actions_recipe';
import { insertDeadToClosestLivingNeighbour, INSTRUCTIONS, INGREDIENTS } from '../util/diff';
import LinearProgress from 'material-ui/LinearProgress';

const ingredientStr = i => `${i.quantity} ${i.unit} ${i.name}`;

const instructionStr = i => (i.time_gap_to_next ?
  `${i.content} for ${i.time_gap_to_next} mins` :
  `${i.content}`);

class RecipeDiff extends Component {
  componentDidMount() {
    if (this.props.recipe.diff && !this.props.parentRecipe) {
      this.props.fetchRecipe(this.props.recipe.parent);
    }
  }

  renderIngredients() {
    return _.map(this.props.recipe.data.ingredients, i => (
      <li key={i.id}>
        {ingredientStr(i)}
      </li>
    ));
  }

  renderInstructions() {
    return _.map(this.props.recipe.data.instructions, i => (
      <li key={i.id}>
        {instructionStr(i)}
      </li>
    ));
  }


  renderDiff(type) {
    const toString = {
      [INGREDIENTS]: ingredientStr,
      [INSTRUCTIONS]: instructionStr,
    };

    const original = this.props.parentRecipe.data[type];
    const originalMap = _.mapKeys(original, 'id');
    const modifiedMap = _.mapKeys(this.props.recipe.diff[type].modified, 'id');
    const addedMap = _.mapKeys(this.props.recipe.diff[type].added, 'id');
    const removed = this.props.recipe.diff[type].removed;
    const removedMap = _.mapKeys(removed, 'id');
    const curr = this.props.recipe.data[type];

    let all;
    if (_.isEmpty(removed)) {
      all = curr;
    } else {
      all = _.cloneDeep(curr);
      for (let i = 0; i < removed.length; i++) {
        insertDeadToClosestLivingNeighbour(removed[i], original, all);
      }
    }

    return _.map(all, (i) => {
      if (addedMap[i.id]) {
        return (
          <li key={i.id}>
            <Diff inputB={toString[type](i)} />
          </li>
        );
      }

      if (modifiedMap[i.id]) {
        return (
          <li key={i.id}>
            <Diff
              inputA={toString[type](originalMap[i.id])}
              inputB={toString[type](modifiedMap[i.id])}
            />
          </li>
        );
      }

      if (removedMap[i.id]) {
        return (
          <p key={i.id} style={{ margin: '0px' }}>
            <Diff inputA={toString[type](i)} />
          </p>
        );
      }


      return (
        <li key={i.id}>
          {toString[type](i)}
        </li>
      );
    });
  }

  render() {
    const { diff } = this.props.recipe;

    if (diff && !this.props.parentRecipe) {
      return <LinearProgress mode="indeterminate" />;
    }

    return (

      <div>
        <b>Ingredients:</b>
        <ul>
          { diff && diff.ingredients ? this.renderDiff(INGREDIENTS) :
                                     this.renderIngredients()
        }
        </ul>

        <br />

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
};

function mapStateToProps({ recipes }, ownProps) {
  const parentRecipe = ownProps.recipe.parent;

  if (!parentRecipe) { return {}; }

  if (!recipes[parentRecipe]) { return {}; }

  return {
    parentRecipe: recipes[parentRecipe],
  };
}

export default connect(mapStateToProps, { fetchRecipe })(RecipeDiff);
