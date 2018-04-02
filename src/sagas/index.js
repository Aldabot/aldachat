import { delay } from 'redux-saga';
import { call, put, takeEvery, all } from 'redux-saga/effects';
import { addMessage, hideInput, showInput } from '../actions/index.js';
import { DialogflowV1 } from '../dialogflow.js';

export function* addMessageWithDelay(action) {
    yield put(hideInput());
    yield put(addMessage(action.msg));
    yield delay(500);
    const speech = yield call(DialogflowV1.handleInputText, action.msg.content);
    const msg = {
        content: speech
    };
    yield put(addMessage(msg));
    yield delay(500);
    yield put(showInput());
}

export function* watchAddMessage() {
    yield takeEvery('ADD_MESSAGE_WITH_DELAY', addMessageWithDelay);
}

export default function*rootSaga() {
    yield all([
        watchAddMessage()
    ]);
}
