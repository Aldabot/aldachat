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
    type: 'number',
    text: {
      size: 30,
      placeholder: 'Escribe aqui ...',
    },
    buttons: [{
      text: 'De que servicios ofreces?',
      value: 'b1'
    }, {
      text: 'Quiero hablar...',
      value: 'b2'
    }],
    cards: [{
      title: 'Card 1',
    }, {
      title: 'Cards 2'
    }, {
      title: 'Card 1',
    }, {
      title: 'Cards 2'
    }],
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
