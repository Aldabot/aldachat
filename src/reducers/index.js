import { combineReducers } from 'redux';
import { ADD_MESSAGE } from '../actions/index';


function messages(state = [], action) {
    switch (action.type) {
    case ADD_MESSAGE:
        return [
            ...state,
            {
                content: "test"
            }
        ];
    default:
        return state;
    }
}

const chatApp = combineReducers({
    messages
});

export default chatApp;
