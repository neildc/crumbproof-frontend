import _ from "lodash";
import equal from "fast-deep-equal";

export const INSTRUCTIONS = 'instructions';
export const INGREDIENTS = 'ingredients';

export function getModifications(type, orig, curr) {

  if (equal(orig, curr)) {
    return null;
  }

  var key;
  if (type === INGREDIENTS) { key = 'id';}
  if (type === INSTRUCTIONS) { key = 'step_number';}

  let removed = _.differenceBy(orig, curr, key);

  let existedInOriginal = _.filter(curr, i => key in i);

  let modified = _.filter(existedInOriginal , (i) => {
    let match = _.find(orig, {[key]: i[key]});
    return !equal(i, match);
  });

  var added;
  if (type === INGREDIENTS) {
    added = _.filter(curr, i => !(key in i));

    // Add negative ids from -1..-inf to any new ingredients
    // guaranteed to not have any collisions with since existing
    // ingredients will have a positive id
    for (let i = 0; i < added.length; i++) {
      added[i].id = (i+1)*(-1);
    }
  } else if (type === INSTRUCTIONS) {
    let currWithStepNumbers = insertIntermediateStepNumbers(curr);
    // All existing steps will have a integer for their step number
    // New steps will have a decimal value for their step_number
    added = _.filter(currWithStepNumbers, i => !_.isInteger(i.step_number));
  }

  return {removed, added, modified};
}

function insertIntermediateStepNumbers(instructions) {

  var ret = _.cloneDeep(instructions);

  // Gives us 100 possible keys to use in between each step
  // Should be plenty, unlikely that a user will add 100 steps
  const STEP_INCREMENT = 0.01;

  for (let i = 0; i < ret.length; i++) {

    // No step number therefore it must be a modification
    // to the original, since step numbers only get added to the
    // instruction when a recipe is submitted
    if (!ret[i].step_number) {

      // The fractional increment gives us a way to distinguish it from
      // original ret while retaining order
      ret[i].step_number = ret[i-1].step_number + STEP_INCREMENT;
    }
  }
  return ret;
}
