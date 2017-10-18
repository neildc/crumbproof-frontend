import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import promise from "redux-promise";
import { composeWithDevTools } from 'redux-devtools-extension';

import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers";

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import crumbproofTheme from './theme';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import App from './App';

document.getElementById('loader').style.display = 'none';
document.getElementById('app').style.display = 'block';


function root() {

  const store = createStore(reducers, composeWithDevTools(
    applyMiddleware(promise),
  ));

  return (
    <Provider store={store}>
      <MuiThemeProvider muiTheme={crumbproofTheme}>
        <App/>
      </MuiThemeProvider>
    </Provider>
  );
}

ReactDOM.render(root(), document.querySelector(".app"));

registerServiceWorker();
