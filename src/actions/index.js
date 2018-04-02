/*
 * action types
 */

export const ADD_MESSAGE = 'ADD_MESSAGE';
export const ADD_MESSAGE_WITH_DELAY = 'ADD_MESSAGE_WITH_DELAY';


/*
 * action creators
 */

export function addMessage(msg) {
    return { type: ADD_MESSAGE, msg };
}
export function addMessageWithDelay(msg) {
    return { type: ADD_MESSAGE_WITH_DELAY, msg };
}
