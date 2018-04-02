import { combineReducers } from 'redux';
import { ADD_MESSAGE } from '../actions/index';


function messages(state = [], action) {
    console.log('msgReducer', action);
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

const chatApp = combineReducers({
    messages
});

export default chatApp;
