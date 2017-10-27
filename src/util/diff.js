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
  let added = _.filter(curr, i => !(key in i));

  let existedInOriginal = _.filter(curr, i => key in i);

  let modified = _.filter(existedInOriginal , (i) => {
    let match = _.find(orig, {[key]: i[key]});
    return !equal(i, match);
  });

  return {removed, added, modified};
}
