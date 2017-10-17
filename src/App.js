import './index.css';

import React from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import promise from "redux-promise";
import { composeWithDevTools } from 'redux-devtools-extension';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import crumbproofTheme from './theme';

import reducers from "./reducers";

import Header from "./components/header"

import LoginIndex from "./components/login_index";
import RecipesIndex from "./components/recipes_index";
import RecipesNew from "./components/recipes_new";
import RecipesShow from "./components/recipes_show";

import ActivityIndex from "./components/activity_index";
import ActivityNew from "./components/activity_new";
import ActivityShow from "./components/activity_show";


class App extends React.Component {

  render() {

    const store = createStore(reducers, composeWithDevTools(
      applyMiddleware(promise),
    ));

    return (
      <Provider store={store}>
        <MuiThemeProvider muiTheme={crumbproofTheme}>
            <BrowserRouter>
              <div className="bg">
                <Header/>
                <div className="container">
                  <div className="main">
                    <Switch>
                      <Route path="/recipes/new" component={RecipesNew} />
                      <Route path="/recipes/:id" component={RecipesShow} />
                      <Route path="/recipes" component={RecipesIndex} />
                      <Route path="/activity/new" component={ActivityNew} />
                      <Route path="/activity/:id" component={ActivityShow} />
                      <Route path="/activity" component={ActivityIndex} />
                      <Route path="/login" component={LoginIndex} />
                      <Route path="/" component={RecipesIndex} />
                    </Switch>
                  </div>
                </div>
              </div>
            </BrowserRouter>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default App;
