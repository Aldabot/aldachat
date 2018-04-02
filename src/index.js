import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
// Redux
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import chatApp from './reducers/index';
const storeInitialState = {
  messages: [{
    content: 'Hola Dirk'
  }, {
    content: 'Hola Alda',
    human: true
  }]
};

const store = createStore(
  chatApp,
  storeInitialState,
  applyMiddleware(logger)
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
