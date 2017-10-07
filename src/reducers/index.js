import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import RecipesReducer from "./reducer_recipes";
import AuthReducer from "./reducer_auth";

const rootReducer = combineReducers({
  recipes: RecipesReducer,
  auth: AuthReducer,
  form: formReducer
});

export default rootReducer;
