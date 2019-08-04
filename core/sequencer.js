var axios = require("axios");

module.exports = function(emitter){
    emitter._subscription = false;
    emitter.registerHook('rbm::agent::receive::message::worker:one',function(options){

        var getMessageBody = function(userEvent) {
          if (userEvent.text != undefined) {
              return userEvent.text;
          } else if (userEvent.suggestionResponse != undefined) {
              return userEvent.suggestionResponse.postbackData;
          }
      
          return false;
        };
    
        var handleMessage = function(userEvent){
          if (userEvent.senderPhoneNumber != undefined && (userEvent.text || userEvent.suggestionResponse)) {
            let msisdn = userEvent.senderPhoneNumber;
            let message = getMessageBody(userEvent);
            let messageId = userEvent.messageId;
    
            let r = emitter.invokeHook("rbm::agent::event::create",{msisdn: msisdn, resource: {"eventType": "READ","messageId": messageId} }); 
            r.then(function(_content){
                let options = {
                    table: "MessageSet",
                    content: { "_id" : cid}
                };
                let s = emitter.invokeHook("db::find",options);
                s.then(function(scontent){

                });
            });
          }
        };

        return new Promise(function(resolve){
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
                message.ack();
              });
              resolve("Subscription is running");
            });
    
          });
    
    });

};
