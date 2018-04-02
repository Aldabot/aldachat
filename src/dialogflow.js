import Vue from 'vue';
import BotUI from 'botui';
import apiai from 'apiai';
import Promise from 'bluebird';
const dialogflow = apiai('906971596e7544718f320847dde0d15a');
const botui = BotUI('aldabot', { vue: Vue });

// bot configuration
const messageDelay = 500;
const platform = 'facebook';

class BotApi {
    static sendTextMessage(text, delay) {
        return botui.message.add({
            delay: delay,
            content: text
        });
    }

    static sendTextInputField() {
        return botui.action.text({
            action: { placeholder: 'Escribe aqui' }
        });
    }

    static sendQuickReplies(title, quickReplies, delay) {
        return BotApi.sendTextMessage(title, delay)
            .then(() => {
                delay += messageDelay;
                const botUIButtons = quickReplies.map((quickReply) => {
                    return {
                        text: quickReply,
                        value: quickReply
                    };
                });
                return botui.action.button({ action: botUIButtons });
            }).then((selectedQuickReply) => BotApi.handleQuickReply(selectedQuickReply));
    }

    static handleQuickReply(selectedQuickReply) {
        const { value } = selectedQuickReply;
        return BotApi.handleTextInput({ value });
    }

    static handleTextInput(input) {
        const inputText = input.value;
        return DialogflowV1.handleInputText(inputText)
            .then(BotApi.sendTextInputField)
            .then(BotApi.handleTextInput);
    }

    static startBot = (initialMessageText) => {
        return BotApi.sendTextMessage(initialMessageText, messageDelay)
            .then(() => {
                return botui.message.add({
                    loading: true
                });
            });
            // .then(() => {
            //     return BotApi.sendTextInputField();
            // }).then(BotApi.handleTextInput);
    };
}

export class DialogflowV1 {
    static handleInputText(inputText) {
        return DialogflowV1.textRequest(inputText)
            .then((response) => {
                const messages = response.result.fulfillment.messages;
                let delay = 0;
                return Promise.map(messages, (message) => {
                    delay += messageDelay;
                    return DialogflowV1.handleMessage(message, delay);
                });
            });
    }

    static handleMessage(message, delay) {
        if (message.platform && message.platform === platform) {
            const type = message.type;
            switch(type) {
            case 0:
                const speech = message.speech;
                return speech;
            case 2:
                const title = message.title;
                const quickReplies = message.replies;
                return BotApi.sendQuickReplies(title, quickReplies, delay);
            default:
                return null;
            }
        }
        return null;
    }

    // wrap Apiai V1 Node API into Promise
    static textRequest = (text) => {
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
}


// BotApi.startBot('Hola');

