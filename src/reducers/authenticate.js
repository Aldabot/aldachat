import {
    SIGN_IN,
    SIGN_OUT
} from '../actions/authenticator'

export function user(state = { isLoggedIn: false }, action) {
    switch(action.type) {
    case SIGN_IN:
        return {
            ...action.user,
            isLoggedIn: true
        }
    case SIGN_OUT:
        return {
            isLoggedIn: false
        }
    default:
        return state;
    }
}
