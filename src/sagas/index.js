import { delay } from 'redux-saga';
import { call, put, takeEvery, all } from 'redux-saga/effects';
import {
    addMessage,
    hideInput,
    showInput,
    updateInput,
    setInputCards,
    setInputTypeToText
} from '../actions/index.js';
import Promise from 'bluebird';
import { v4 as uuidV4 } from 'uuid';
import axios from 'axios'

// Select language of Dialogflow from browser settings
var browserLanguage = window.navigator.userLanguage || window.navigator.language;
let language;
switch(browserLanguage) {
case 'es-ES':
    language = 'es';
    break;
default:
    // DEFAULT LANGUAGE SHOULD BE EN
    language = 'es';
}

const uuid = uuidV4();

// configuration
const messageDelay = 500;
const platform = 'facebook';

function* messageGenerator(message) {
    if (message.text) {
        const msg = { content: message.text.text[0]}
        yield put(addMessage(msg))
    }
    // const type = message.type;
    // switch(type) {
    // case 0:
    //     const msg = {
    //         content: message.
    //     };
    //     yield put(addMessage(msg));
    //     break;
    // case 1:
    //     yield put(setInputCards(message.cards));
    //     break;
    // case 2:
    //     yield put(addMessage({ content: message.title}));
    //     const quickReplies = message.replies.map((quickReply) => {
    //         return { text: quickReply };
    //     });
    //     const input = {
    //         type: "button",
    //         buttons: quickReplies
    //     };
    //     yield delay(500);
    //     yield put(updateInput(input));
    // case 'custom_payload':
    //     console.log(message);
    //     // if (message.payload.input && message.payload.input === 'input') {
    //     //     yield put(updateInput({ type: 'nuber' }));
    //     // }
    // default:
    //     return null;
    // }
};

const instance = axios.create({
    baseURL: 'https://axbeotjnca.execute-api.eu-west-1.amazonaws.com/dev/',
    withCredentials: true
})
// wrap Dialogflow V2 into Promise
function dialogflowV2Request(text) {
    return instance.post('dialogflow/detectIntent', { message: 'prestamo' })
        .then((response) => response.data)
        .catch((error) => {throw error})
}

export function* addMessageWithDelay(action) {
    yield put(hideInput());
    yield put(setInputTypeToText());
    yield put(addMessage(action.msg));
    console.log(action.msg.content);
    const dialogflowV2Response = yield call(dialogflowV2Request, action.msg.content);
    console.log(dialogflowV2Response)
    const messages = dialogflowV2Response.fulfillmentMessages;
    yield messageGenerator(messages[0])
    // const cardMessage = {
    //     type: 1,
    //     cards: []
    // };
    // for (const message of messages) {
    //     // if (message.platform && message.platform === platform) {
    //         // if card, gather and send as one message
    //         if (message.card) {
    //             cardMessage.cards.push(message);
    //         } else {
    //             if (cardMessage.cards.length > 0) {
    //                 yield delay(500);
    //                 yield messageGenerator(cardMessage);
    //                 cardMessage.cards = [];
    //             }
    //             yield delay(500);
    //             yield messageGenerator(message);
    //         }
    //     // }
    // }
    // if (cardMessage.cards.length > 0) {
    //     yield delay(500);
    //     yield messageGenerator(cardMessage);
    //     cardMessage.cards = [];
    // }
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
