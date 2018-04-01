import Vue from 'vue';
import BotUI from 'botui';
import apiai from 'apiai';
const dialogflow = apiai('906971596e7544718f320847dde0d15a');
const botui = BotUI('aldabot', { vue: Vue });

const messageDelay = 500;

class BotApi {
    static sendTextMessage(text) {
        return botui.message.add({
            delay: messageDelay,
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
        return DialogflowV1.textRequest(inputText);
    }

    static startBot = (text) => {
        return BotApi.sendTextMessage(text)
            .then(BotApi.sendTextInputField)
            .then(BotApi.handleTextInput)
            .then((responseText) => {
                return BotApi.startBot(responseText);
            });
    };
}

class DialogflowV1 {
    constructor(dialogflowJSON) {
        this.messages = dialogflowJSON.result.fulfillment.messages;
    }

    // wrap Apiai V1 Node API into Promise
    static textRequest = (text) => {
        return new Promise((resolve, reject) => {
            const request = dialogflow.textRequest(text, { sessionId: '1' });

            request.on('response', function(dialogflowResponse) {
                console.log(dialogflowResponse);
                const response = dialogflowResponse.result.fulfillment.speech;
                resolve(response);
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

