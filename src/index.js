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

import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { ROOT_URL } from './constants/hosts';


document.getElementById('loader').style.display = 'none';
document.getElementById('app').style.display = 'block';


function root() {

  const store = createStore(reducers, composeWithDevTools(
    applyMiddleware(promise),
  ));


  const client = new ApolloClient({
    link: new HttpLink({
      uri: `${ROOT_URL}/graphql`,
      credentials: 'same-origin',
    }),
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <MuiThemeProvider muiTheme={crumbproofTheme}>
          <App/>
        </MuiThemeProvider>
      </Provider>
    </ApolloProvider>
  );
}

ReactDOM.render(root(), document.querySelector(".app"));

registerServiceWorker();
