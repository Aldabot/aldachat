import { delay } from 'redux-saga';
import { call, put, takeEvery, all } from 'redux-saga/effects';
import {
    addMessage,
    addCardMessage,
    hideInput,
    showInput,
    updateInput,
    setInputTypeToText
} from '../actions/index.js';
import axios from 'axios'

// Select language of Dialogflow from browser settings
// var browserLanguage = window.navigator.userLanguage || window.navigator.language;
// let language;
// switch(browserLanguage) {
// case 'es-ES':
//     language = 'es';
//     break;
// default:
//     // DEFAULT LANGUAGE SHOULD BE EN
//     language = 'es';
// }

function* messageGenerator(message) {
    if (message.text) {
        const msg = { text: message.text.text[0]}
        yield put(addMessage(msg))
    }
    if (message.quickReplies) {
        console.log("quick")
        const msg = { content: message.quickReplies.title}
        yield put(addMessage(msg))
        const quickReplies = message.quickReplies.quickReplies.map((quickReply) => {
            return { text: quickReply };
        });
        const input = {
            type: "button",
            buttons: quickReplies
        };
        yield delay(500);
        yield put(updateInput(input));
    }
    if (message.cards) {
        yield delay(500);
        yield put(addCardMessage(message.cards))
    }
};

const instance = axios.create({
    baseURL: 'https://axbeotjnca.execute-api.eu-west-1.amazonaws.com/dev/',
    withCredentials: true
})
// wrap Dialogflow V2 into Promise
function dialogflowV2Request(text) {
    return instance.post('dialogflow/detectIntent', { message: text })
        .then((response) => response.data)
        .catch((error) => {throw error})
}

export function* addMessageWithDelay(action) {
    yield put(hideInput());
    yield put(setInputTypeToText());
    yield put(addMessage(action.msg));
    const dialogflowV2Response = yield call(dialogflowV2Request, action.msg.text);
    const messages = dialogflowV2Response.fulfillmentMessages;

    const carouselCards = { cards: [] }
    for(const message of messages) {
        // exclude messages other than for facebook
        // if(message.platform === 'FACEBOOK') {
        //     continue
        // }

        // gather cards
        if(message.card) {
            carouselCards.cards.push(message.card)
        } else {
            if (carouselCards.cards.length > 0) {
                yield delay(500)
                yield messageGenerator(carouselCards)
                carouselCards.cards = []
            }
            yield delay(500)
            yield messageGenerator(message)
        }
    }
    if(carouselCards.cards.length > 0) {
        yield delay(500)
        yield messageGenerator(carouselCards)
        carouselCards.cards = []
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
