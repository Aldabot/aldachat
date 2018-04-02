/*
 * action types
 */

export const ADD_MESSAGE = 'ADD_MESSAGE';
export const ADD_MESSAGE_WITH_DELAY = 'ADD_MESSAGE_WITH_DELAY';
export const SHOW_INPUT = 'SHOW_INPUT';
export const HIDE_INPUT = 'HIDE_INPUT';


/*
 * action creators
 */

export function addMessage(msg) {
    return { type: ADD_MESSAGE, msg };
}
export function addMessageWithDelay(msg) {
    return { type: ADD_MESSAGE_WITH_DELAY, msg };
}
export function showInput() {
    return { type: SHOW_INPUT };
}
export function hideInput() {
    return { type: HIDE_INPUT };
}
