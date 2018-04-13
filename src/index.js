import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
// Intl
import { IntlProvider, addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import es from 'react-intl/locale-data/es';
// Redux
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import chatApp from './reducers/index';
// Sagas
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas/index.js';
const sagaMiddleware = createSagaMiddleware();

addLocaleData([...en, ...es]);
const enDict = {
  "chat.textInputPlaceholder": "Write here...",
  "chat.cardInputContinue": "Thanks Alda! What else do you offer?"
};
const esDict = {
  "chat.textInputPlaceholder": "Escribe aqui...",
  "chat.cardInputContinue": "Gracias Alda! Qué más ofreces?"
};
var browserLanguage = window.navigator.userLanguage || window.navigator.language;
let language;
let dict;
switch(browserLanguage) {
  case 'es-ES':
    language = 'es';
    dict = esDict;
    break;
  default:
    language = 'en';
    dict = enDict;
}

const storeInitialState = {
  messages: [{
    content: 'Hey'
  }],
  input: {
    type: 'text',
    text: {
      size: 30,
      placeholder: 'Escribe aqui ...',
    },
    buttons: [{
      text: 'Que servicios ofreces?',
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
    <IntlProvider locale={language} messages={dict}>
      <App />
    </IntlProvider>
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
