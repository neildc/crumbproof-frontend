import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import RecipesReducer from "./reducer_recipes";
import ActivitiesReducer from "./reducer_activities";
import LiveActivityReducer from "./reducer_live_activity";
import AuthReducer from "./reducer_auth";

const rootReducer = combineReducers({
  recipes: RecipesReducer,
  activities: ActivitiesReducer,
  liveActivity: LiveActivityReducer,
  auth: AuthReducer,
  form: formReducer
});

export default rootReducer;
