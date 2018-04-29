import { routerReducer } from 'react-router-redux'
import { combineReducers } from 'redux'
import { user } from './authenticate.js'
import {
    ADD_MESSAGE,
    SHOW_INPUT,
    HIDE_INPUT,
    UPDATE_INPUT,
    SET_INPUT_CARDS,
    SET_INPUT_TYPE_TO_TEXT
} from '../actions/index';

function messages(state = [], action) {
    switch (action.type) {
    case ADD_MESSAGE:
        return [
            ...state,
            action.msg
        ];
    default:
        return state;
    }
}

function input(state = [], action) {
    switch(action.type) {
    case SHOW_INPUT:
        return {
            ...state,
            show: true
        };
    case HIDE_INPUT:
        return {
            ...state,
            show: false
        };
    case SET_INPUT_TYPE_TO_TEXT:
        return {
            ...state,
            type: 'text'
        };
    case SET_INPUT_CARDS:
        return {
            ...state,
            type: 'card',
            cards: action.cards
        };
    case UPDATE_INPUT:
        return {
            ...state,
            ...action.input
        };
    default:
        return state;
    }
};

const chatApp = combineReducers({
    messages,
    input,
    router: routerReducer,
    user
});

export default chatApp;
