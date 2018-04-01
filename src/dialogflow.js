import Vue from 'vue';
import BotUI from 'botui';
import apiai from 'apiai';
const dialogflow = apiai('906971596e7544718f320847dde0d15a');
const botui = BotUI('aldabot', { vue: Vue });

const textRequest = (text) => {
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

const respond = (text) => {
    return botui.message.add({
        delay: 500,
        content: text
    }).then(() => {
        return botui.action.text({
            action: { placeholder: 'Escribe aqui' }
        });
    }).then((input) => {
        const inputText = input.value;
        return textRequest(inputText);
    }).then((responseText) => {
        return respond(responseText);
    });
};

respond('Hola');

class DialogflowV1 {
    constructor(dialogflowJSON) {
        this.messages = dialogflowJSON.result.fulfillment.messages;
    }

    
}
