import { delay } from 'redux-saga';
import { put, takeEvery, all } from 'redux-saga/effects';
import { addMessage } from '../actions/index.js';

export function* addMessageWithDelay(action) {
    yield delay(500);
    yield put(addMessage(action.msg));
}

export function* watchAddMessage() {
    yield takeEvery('ADD_MESSAGE_WITH_DELAY', addMessageWithDelay);
}

export default function*rootSaga() {
    yield all([
        watchAddMessage()
    ]);
}
