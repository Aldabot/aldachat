import { combineReducers } from 'redux';
import {
    ADD_MESSAGE,
    SHOW_INPUT,
    HIDE_INPUT,
    UPDATE_INPUT
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
    input
});

export default chatApp;
