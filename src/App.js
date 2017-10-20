import './index.css';

import React from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { authCheckLocalStorage } from "./actions/actions_auth";

import Header from "./components/header";
import RequireAuth from "./components/hoc/require_auth";

import LoginIndex from "./components/login_index";
import RegisterIndex from "./components/register_index";
import RecipesIndex from "./components/recipes_index";
import RecipesNew from "./components/recipes_new";
import RecipesShow from "./components/recipes_show";

import ActivityIndex from "./components/activity_index";
import ActivityNew from "./components/activity_new";
import ActivityShow from "./components/activity_show";


class App extends React.Component {

  componentWillMount() {
    this.props.authCheckLocalStorage();
  }

  routes() {
    return (
      <Switch>
        <Route path="/recipes/new" component={
          RequireAuth(RecipesNew, "Please sign in to create a new recipe")}/>
        <Route path="/recipes/:id" component={RecipesShow} />
        <Route path="/recipes" component={RecipesIndex} />

        <Route path="/activity/new/recipe/:recipeId" component={
          RequireAuth(ActivityNew, "Please sign in to create a new activity")} />
        <Route path="/activity/new" component={
          RequireAuth(ActivityNew, "Please sign in to create a new activity")} />
        <Route path="/activity/:id" component={ActivityShow} />
        <Route path="/activity" component={ActivityIndex} />

        <Route path="/login" component={LoginIndex} />
        <Route path="/register" component={RegisterIndex} />

        <Route path="/" component={RecipesIndex} />
      </Switch>
    );
  }

  render() {
    return (
      <BrowserRouter>
        <div className="bg">
          <Header/>
          <div className="container">
            <div className="main">
              {this.routes()}
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(null, {authCheckLocalStorage})(App)
