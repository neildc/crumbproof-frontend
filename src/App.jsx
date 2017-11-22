
import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './index.css';

import { authCheckLocalStorage } from './actions/actions_auth';

import Header from './components/header';
import RequireAuth from './components/hoc/require_auth';

import UserFeedbackSnackbar from './components/user_feedback_snackbar';

import LoginIndex from './components/login_index';
import RegisterIndex from './components/register_index';
import RecipesIndex from './components/recipes_index';
import RecipesNew from './components/recipes_new';
import RecipeShow from './components/recipe_show';

import ActivityIndex from './components/activity_index';
import ActivityNew from './components/activity_new';
import ActivityShow from './components/activity_show';

import LiveActivityStart from './components/live_activity_start';
import LiveActivity from './components/live_activity';

class App extends React.Component {
  componentWillMount() {
    this.props.authCheckLocalStorage();
  }

  routes() {
    return (
      <Switch>
        <Route
          exact
          path="/recipes/new"
          component={
          RequireAuth(RecipesNew, 'Please sign in to create a new recipe')}
        />
        <Route exact path="/recipes" component={RecipesIndex} />
        <Route path="/recipes/:id" component={RecipeShow} />

        <Route
          path="/activity/new/recipe/:recipeId"
          component={
          RequireAuth(ActivityNew, 'Please sign in to create a new activity')}
        />
        <Route
          exact
          path="/activity/new"
          component={
          RequireAuth(ActivityNew, 'Please sign in to create a new activity')}
        />
        <Route exact path="/activity" component={ActivityIndex} />
        <Route
          path="/live/start/recipe/:recipeId"
          component={
          RequireAuth(LiveActivityStart, 'Please sign to start a new activity')}
        />
        <Route
          exact
          path="/live"
          component={
            RequireAuth(LiveActivity, 'Please sign in to see your current activity')}
        />

        <Route path="/activity/:id" component={ActivityShow} />

        <Route exact path="/login" component={LoginIndex} />
        <Route exact path="/register" component={RegisterIndex} />

        <Route exact path="/" component={ActivityIndex} />
      </Switch>
    );
  }

  render() {
    return (
      <BrowserRouter>
          <div className="bg">
            <Header />
            <div className="container">
              <div className="main">
                {this.routes()}
                <UserFeedbackSnackbar />
              </div>
            </div>
          </div>
      </BrowserRouter>
    );
  }
}

export default connect(null, { authCheckLocalStorage })(App);
