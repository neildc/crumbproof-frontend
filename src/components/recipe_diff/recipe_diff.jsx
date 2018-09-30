import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import LinearProgress from 'material-ui/LinearProgress';

import Diff from '../diff';
import {
  insertAllRemovedItemsIntoCurrent,
  INSTRUCTIONS,
  INGREDIENTS,
} from '../../util/diff';

const ingredientStr = i => `${i.quantity} ${i.unit} ${i.name}`;

const instructionStr = i => (i.time_gap_to_next ?
  `${i.content} for ${i.time_gap_to_next} mins` :
  `${i.content}`);

const renderIngredients = ingredients => (
  _.map(ingredients, i => (
    <li key={i.id}>
      {ingredientStr(i)}
    </li>
  ))
);

const renderInstructions = instructions => (
  _.map(instructions, i => (
    <li key={i.id}>
      {instructionStr(i)}
    </li>
  ))
);

const renderDiff = (props, type) => {
  const toString = {
    [INGREDIENTS]: ingredientStr,
    [INSTRUCTIONS]: instructionStr,
  };

  const original = props.parentRecipe.data[type];
  const originalMap = _.mapKeys(original, 'id');
  const modifiedMap = _.mapKeys(props.recipe.diff[type].modified, 'id');
  const addedMap = _.mapKeys(props.recipe.diff[type].added, 'id');
  const removed = props.recipe.diff[type].removed;
  const removedMap = _.mapKeys(removed, 'id');
  const curr = props.recipe.data[type];

  const all = insertAllRemovedItemsIntoCurrent(removed, original, curr);

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
};

const RecipeDiffPresentation = (props) => {
  const { diff } = props.recipe;

  if (diff && !props.parentRecipe) {
    return <LinearProgress mode="indeterminate" />;
  }

  const { ingredients, instructions } = props.recipe.data;

  return (

    <div>
      <b>Ingredients:</b>
      <ul>
        { diff && diff.ingredients ?
          renderDiff(props, INGREDIENTS) :
          renderIngredients(ingredients)
        }
      </ul>

      <br />

      <b>Instructions:</b>
      <ol>
        { diff && diff.instructions ?
          renderDiff(props, INSTRUCTIONS) :
          renderInstructions(instructions)
        }
      </ol>
    </div>
  );
};

RecipeDiffPresentation.proptypes = {
  recipe: PropTypes.object.required,
  parentRecipe: PropTypes.object,
};

export default RecipeDiffPresentation;
