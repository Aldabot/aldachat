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
// Sagas
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas/index.js';
const sagaMiddleware = createSagaMiddleware();

const storeInitialState = {
  messages: [{
    content: 'Hola Dirk'
  }, {
    content: 'Hola Alda',
    human: true
  }],
  input: {
    text: {
      size: 30,
      placeholder: 'Write here ...',
    },
    show: true
  }
};

const store = createStore(
  chatApp,
  storeInitialState,
  applyMiddleware(
    sagaMiddleware,
    logger
  )
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
