import _ from 'lodash';
import {
  FETCH_RECIPES,
  FETCH_RECIPE,
  DELETE_RECIPE,
} from '../actions/actions_recipe';

import { CLEAR_FEEDBACK_MESSAGE } from '../actions/actions_feedback_messages';

export default function (state = {}, action) {
  switch (action.type) {
    case DELETE_RECIPE: {
      return {..._.omit(state, action.payload), message: "Recipe deleted"}
    /*
     *
     *  The _.merge is to handle a possible race condition of
     *  FETCH_RECIPES or FETCH_RECIPE resolving before FETCH_RECIPE_ACTIVITIES
     *  which would result in the activity_history prop for a recipe to be
     *  discarded by the new object
     *
     *  Using merge allows us to ensure that if activity_history exists in
     *  any of the recipe objects that, it isn't discarded.
     *
     *  ** ASSUMPTION THAT IS MADE **
     *     Currently we don't allow the user to edit recipes
     *
     */
    }
    case FETCH_RECIPE: {
      const newRecipe = { [action.payload.data.id]: action.payload.data };
      return _.merge({}, newRecipe, state);
    }
    case FETCH_RECIPES: {
      const newRecipes = _.mapKeys(action.payload.data.results, 'id');
      return _.merge({}, newRecipes, state);
    }

    case CLEAR_FEEDBACK_MESSAGE:
      if (action.payload === 'recipes') {
        return { ...state, error: null, message: null };
      } else {
        return state;
      }

    default: {
      return state;
    }
  }
}
