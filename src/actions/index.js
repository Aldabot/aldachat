/*
 * action types
 */

export const ADD_MESSAGE = 'ADD_MESSAGE';


/*
 * action creators
 */

export function addMessage(content) {
    return { type: ADD_MESSAGE, content };
}
