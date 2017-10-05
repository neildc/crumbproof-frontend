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
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

//import 'typeface-roboto';


import reducers from "./reducers";
import LoginIndex from "./components/login_index";
import RecipesIndex from "./components/recipes_index";
import RecipesNew from "./components/recipes_new";
import RecipesShow from "./components/recipes_show";

const createStoreWithMiddleware = composeWithDevTools(applyMiddleware(promise))(createStore);

const store = createStore(reducers, composeWithDevTools(
  applyMiddleware(promise),
));

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider muiTheme={crumbproofTheme}>
        <BrowserRouter>
        <div>
        <div style={{marginBottom:"50px"}}>
            <AppBar title="crumb proof" showMenuIconButton={false} />
        </div>
        <div className="container">
        <Card containerStyle={{padding:'30px'}}>
            <Switch>
            <Route path="/recipes/new" component={RecipesNew} />
            <Route path="/recipes/:id" component={RecipesShow} />
            <Route path="/login" component={LoginIndex} />
            <Route path="/" component={RecipesIndex} />
            </Switch>
        </Card>
        </div>
        </div>
        </BrowserRouter>
    </MuiThemeProvider>
  </Provider>,
  document.querySelector(".app")
);
