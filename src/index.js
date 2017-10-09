import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import promise from "redux-promise";
import { composeWithDevTools } from 'redux-devtools-extension';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import crumbproofTheme from './theme'
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import reducers from "./reducers";
import LoginIndex from "./components/login_index";
import RecipesIndex from "./components/recipes_index";
import RecipesNew from "./components/recipes_new";
import RecipesShow from "./components/recipes_show";

import ActivityIndex from "./components/activity_index"
import ActivityNew from "./components/activity_new"

import { Link } from "react-router-dom";
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

const store = createStore(reducers, composeWithDevTools(
  applyMiddleware(promise),
));

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider muiTheme={crumbproofTheme}>
        <BrowserRouter>
          <div className="container bg">
            <AppBar
              className="appBar"
              title="crumb proof"
              showMenuIconButton={false}
              iconElementRight={<FlatButton containerElement={<Link to="/login"/>} label={"Login"} />}
            />
            <Toolbar className="toolbar">
              <ToolbarGroup>
                <FlatButton containerElement={<Link to="/activity"/>} label={"Activites"} />
                <FlatButton containerElement={<Link to="/recipies"/>} label={"Recipes"} />
              </ToolbarGroup>
            </Toolbar>
            <div className="card">
              <Switch>
                <Route path="/recipes/new" component={RecipesNew} />
                <Route path="/recipes/:id" component={RecipesShow} />
                <Route path="/recipes" component={RecipesIndex} />
                <Route path="/activity/new" component={ActivityNew} />
                <Route path="/activity" component={ActivityIndex} />
                <Route path="/login" component={LoginIndex} />
                <Route path="/" component={RecipesIndex} />
              </Switch>
            </div>
          </div>
        </BrowserRouter>
    </MuiThemeProvider>
  </Provider>,
  document.querySelector(".app")
);
