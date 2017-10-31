import _ from "lodash";
import equal from "fast-deep-equal";

export const INSTRUCTIONS = 'instructions';
export const INGREDIENTS = 'ingredients';

export function generateDiff(type, orig, curr) {

  if (equal(orig, curr)) {
    return null;
  }

  let key = 'id';

  let removed = _.differenceBy(orig, curr, key);

  let existedInOriginal = _.filter(curr, i => key in i);

  let modified = _.filter(existedInOriginal , (i) => {
    let match = _.find(orig, {[key]: i[key]});
    return !equal(i, match);
  });

  let added = _.filter(curr, i => !(key in i));

  return {removed, added, modified};
}

/*
 * Insert the removed elements into the new recipe
 *
 * Since we don't have any step numbers simply place the removed instructions
 * as close to any neighbouring instructions that haven't been also removed
 *
 *  [prev]         [living]
 *   1              1  -           ^
 *   2              2  | top       |
 *   3              3  -           |
 *   4 <- removed               Search  alternating between up and down
 *   5              5  -           |    until we find a neighbour
 *   6              6  | bot       |    from prev that exists in living.
 *   7              7  |           |    All elements have a UUID
 *   8              8  -           v
 *
 *  Once we find a match then we simply insert it next to the match
 *     - match from top: Insert below the match if it came from
 *     - match from bottom: Insert above the match if it came from
 */
export function insertDeadToClosestLivingNeighbour(dead, prev, living) {

  let deadIndex = _.findIndex(prev, {'id': dead.id});

  // [0 1 2 3 DEAD(4) 5 6]
  // top = 0 - 3
  // DEAD = 4
  // bot = 5 - 6
  // head is reversed since we want to start looking at the closest first
  let top = _.slice(prev, 0, deadIndex).reverse();
  let bot = _.slice(prev, deadIndex+1, prev.length);

  let neighbour = findLivingNeighbour(bot, top, living);

  if (neighbour) {
    insertDeadNextToLivingNeighbour(dead, living, neighbour);
  } else {
    // If we can't find anyone alive then simply
    // place the instruction at the top of the list
    insertDeadNextToLivingNeighbour(dead, living, {id:0, position:'above'});
  }
}

function findLivingNeighbour(bot, top, curr) {
  for (let i=0; top[i] || bot[i]; i++) {
    if (top[i]) {
      let topIndex = _.findIndex(curr, {'id': top[i].id});
      if (topIndex) {
        return {index: topIndex, position: 'below'};
      }
    }

    if (bot[i]) {
      let botIndex = _.findIndex(curr, {'id': bot[i].id});
      if (botIndex) {
        return {index: botIndex, position: 'above'};
      }
    }
  }
  return null;
}

function insertDeadNextToLivingNeighbour(dead, all, neighbour) {
  let {index, position} = neighbour;
  if (position === 'below') all.splice(index + 1, 0, dead);
  if (position === 'above') all.splice(index - 1, 0, dead);
}
