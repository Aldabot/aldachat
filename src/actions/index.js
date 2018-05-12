/*
 * action types
 */

export const ADD_MESSAGE = 'ADD_MESSAGE'
export const ADD_MESSAGE_WITH_DELAY = 'ADD_MESSAGE_WITH_DELAY'
export const ADD_CARD_MESSAGE = 'ADD_CARD_MESSAGE'
export const SHOW_INPUT = 'SHOW_INPUT'
export const HIDE_INPUT = 'HIDE_INPUT'
export const UPDATE_INPUT = 'UPDATE_INPUT'
export const SET_INPUT_CARDS = 'SET_INPUT_CARDS'
export const SET_INPUT_TYPE_TO_TEXT = 'SET_INPUT_TYPE_TO_TEXT'


/*
 * action creators
 */

export function addMessage(msg) {
    return { type: ADD_MESSAGE, msg }
}
export function addMessageWithDelay(msg) {
    return { type: ADD_MESSAGE_WITH_DELAY, msg }
}
export function addCardMessage(cards) {
    return { type: ADD_CARD_MESSAGE, cards: { cards } }
}
export function showInput() {
    return { type: SHOW_INPUT }
}
export function hideInput() {
    return { type: HIDE_INPUT }
}
export function updateInput(input) {
    return { type: UPDATE_INPUT, input }
}
export function setInputCards(cards) {
    return { type: SET_INPUT_CARDS, cards }
}
export function setInputTypeToText() {
    return { type: SET_INPUT_TYPE_TO_TEXT }
}
