import Vue from 'vue';
import BotUI from 'botui';
import apiai from 'apiai';
import Promise from 'bluebird';
const dialogflow = apiai('906971596e7544718f320847dde0d15a');
const botui = BotUI('aldabot', { vue: Vue });

// bot configuration
const messageDelay = 500;

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

    static handleTextInput(input) {
        const inputText = input.value;
        return DialogflowV1.handleInputText(inputText)
            .then(BotApi.sendTextInputField)
            .then(BotApi.handleTextInput);
    }

    static startBot = (initialMessageText) => {
        return BotApi.sendTextMessage(initialMessageText, messageDelay)
            .then(BotApi.sendTextInputField)
            .then(BotApi.handleTextInput);
    };
}

class DialogflowV1 {
    static async handleInputText(inputText) {
        return DialogflowV1.textRequest(inputText)
            .then((response) => {
                const messages = response.result.fulfillment.messages;
                let delay = 0;
                return Promise.map(messages, (message) => {
                    const speech = message.speech;
                    delay += messageDelay;
                    return BotApi.sendTextMessage(speech, delay);
                });
            });
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


BotApi.startBot('Hola');

