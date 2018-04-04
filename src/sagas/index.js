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
import apiai from 'apiai';
const dialogflow = apiai('906971596e7544718f320847dde0d15a');

// configuration
const messageDelay = 500;
const platform = 'facebook';

function* messageGenerator(message) {
    console.log(message);
    const type = message.type;
    switch(type) {
    case 0:
        const msg = {
            content: message.speech
        };
        yield put(addMessage(msg));
        break;
    case 1:
        console.log("cards");
        yield put(setInputCards(message.cards));
        break;
    case 2:
        yield put(addMessage({ content: message.title}));
        const quickReplies = message.replies.map((quickReply) => {
            return { text: quickReply };
        });
        const input = {
            type: "button",
            buttons: quickReplies
        };
        yield delay(500);
        yield put(updateInput(input));
    default:
        return null;
    }
};

// wrap Apiai V1 Node API into Promise
function dialogflowV1Request(text) {
    return new Promise((resolve, reject) => {
        const request = dialogflow.textRequest(text, { sessionId: '1' });

        request.on('response', function(dialogflowResponse) {
            resolve(dialogflowResponse);
        });

        request.on('error', (error) => {
            console.log(error);
            reject(error);
        });

        request.end();
    });
};

export function* addMessageWithDelay(action) {
    yield put(hideInput());
    yield put(setInputTypeToText());
    yield put(addMessage(action.msg));
    const dialogflowV1Response = yield call(dialogflowV1Request, action.msg.content);
    console.log(dialogflowV1Response);
    const messages = dialogflowV1Response.result.fulfillment.messages;
    const cardMessage = {
        type: 1,
        cards: []
    };
    for (const message of messages) {
        if (message.platform && message.platform === platform) {
            // if card, gather and send as one message
            console.log(message);
            if (message.type === 1) {
                console.log("yay cards message");
                cardMessage.cards.push(message);
                console.log("card message");
                console.log(cardMessage);
            } else {
                if (cardMessage.cards.length > 0) {
                    yield delay(500);
                    yield messageGenerator(cardMessage);
                    cardMessage.cards = [];
                }
                yield delay(500);
                yield messageGenerator(message);
            }
        }
    }
    if (cardMessage.cards.length > 0) {
        yield delay(500);
        yield messageGenerator(cardMessage);
        cardMessage.cards = [];
    }
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
