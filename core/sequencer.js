var axios = require("axios");
const config = require("config");
module.exports = function(emitter){

    emitter._subscription = false;
    emitter.registerHook('rbm::agent::receive::message::worker:one',function(options){
        console.log("here 0");
        var getMessageBody = function(userEvent) {
          if (userEvent.text != undefined) {
              return userEvent.text;
          } else if (userEvent.suggestionResponse != undefined) {
              return userEvent.suggestionResponse.postbackData;
          }
      
          return false;
        };
        console.log("here 4");
        var handleMessage = function(userEvent){
            console.log("here 3");
          if (userEvent.senderPhoneNumber != undefined && (userEvent.text || userEvent.suggestionResponse)) {
            let msisdn = userEvent.senderPhoneNumber;
            let message = getMessageBody(userEvent);
            let messageId = userEvent.messageId;
    
            let r = emitter.invokeHook("rbm::agent::event::create",{msisdn: msisdn, resource: {"eventType": "READ","messageId": messageId} }); 
            r.then(function(_content){
                let options = {
                    table: "MessageSet",
                    content: { "messages.uuidv4" : message}
                };
                let s = emitter.invokeHook("db::find",options);
                s.then(function(scontent){

                });
            });
          }
        };
        console.log("here 2");
        return new Promise(function(resolve){
            console.log("here 1");
            let r = emitter.invokeHook("init::pubsub",{	
              projectId: config.project_id,
              keyFilename: config.keyFilename,
              subscriptionName: config.subscriptionName
            }); 
    
            r.then(function(result){
              emitter._subscription.on('message',function(message){ 
                let userEvent = JSON.parse(message.data);
                console.log(userEvent);
                handleMessage(userEvent);
                console.log("here 5");
                message.ack();
              });
              console.log("here 6");
              resolve("Subscription is running");
            });
    
          });
    
    });


};
