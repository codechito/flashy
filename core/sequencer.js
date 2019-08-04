var axios = require("axios");
const config = require("config");


var sendMessage = function(msisdn,uuidv4,contents){

    var createSuggestion = function(element){
        var suggestions = [];

        element.forEach(function(suggestion){
          if(suggestion.type == "Reply"){
            suggestions.push({
              reply:{
                text: suggestion.label,
                postbackData: suggestion.callback
              }
            });
          }
          if(suggestion.type == "Link URL"){
            suggestions.push({
              action:{
                text: suggestion.label,
                postbackData: suggestion.callback,
                openUrlAction: { url: suggestion.url }
              }
            });
          }
          if(suggestion.type == "Dial Number"){
            suggestions.push({
              action: {
                text: suggestion.label,
                postbackData: suggestion.callback,
                dialAction: { phoneNumber: suggestion.phoneNumber }
              }
            });
          }
          if(suggestion.type == "Calendar Invite"){
            suggestions.push({
              action: {
                text: suggestion.label,
                postbackData: suggestion.callback,
                createCalendarEventAction: { 
                  startTime: suggestion.startTime,
                  endTime: suggestion.endTime,
                  title: suggestion.title,
                  description: suggestion.description
                 }
              }
            });
          }
          if(suggestion.type == "View Location"){
            suggestions.push({
              action: {
                text: suggestion.label,
                postbackData: suggestion.callback,
                viewLocationAction: { 
                  latLong: {
                    latitude: suggestion.latitude,
                    longitude: suggestion.longitude
                  },
                  label: suggestion.label,
                 }
              }
            });
          }
        });

        return suggestions;
    };

    var createTemplate = function(element){
        
        var suggestions = createSuggestion(element.suggestions || []);
        if(element.type == "Text"){
          return {
            contentMessage : {
              text: element.message,
              suggestions: suggestions
            }
          };
        }
        if(element.type == "Image/Video"){
          return {
            contentMessage : {
              contentInfo: {
                fileUrl : element.imageurl
              },
              suggestions: suggestions
            }
          };
        }
        if(element.type == "Standalone"){
          var card_suggestions = createSuggestion(element.card_suggestions || []);
          return {
            contentMessage : {
              richCard: {
                standaloneCard: {
                  cardOrientation: element.orientation,
                  thumbnailImageAlignment: element.alignment,
                  cardContent:  {
                    media: {
                      height: element.height,
                      contentInfo: {
                        fileUrl: element.imageurl,
                        thumbnailUrl: element.tnurl,
                        forceRefresh: true
                      }
                    },
                    suggestions: card_suggestions,
                    title: element.title,
                    description: element.description
                  }
                }
              },
              suggestions: suggestions
            }
          };
        }

        if(element.type == "Carousel"){
          
          var images = [];

          element.images.forEach(function(image){
            var card_suggestions = createSuggestion(image.card_suggestions || []);
            images.push({
              media: {
                height: element.height,
                contentInfo: {
                  fileUrl: image.imageurl,
                  forceRefresh: false
                }
              },
              suggestions: card_suggestions,
              title: image.title,
              description: image.description
            });
          });

          return {
            contentMessage : {
              richCard: {
                carouselCard: {
                  cardWidth: element.width,
                  cardContents: images
                }
              },
              suggestions: suggestions
            }
          };
        }
    };

    var message;
    contents.messages.filter(function(msg,idx){
        if(msg.uuidv4 == uuidv4) {
            message = contents.messages[idx];
        }
    });
    console.log("message",message);
    message.elements.forEach(function(element){
        var template = createTemplate(element);
        console.log("template",template);
        var content = {resource : JSON.stringify(template), msisdn : msisdn};
          const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: JSON.stringify(content),
            url: '/campaign/rcs/message/send'
          };
          axios(options)
            .then(function(response){
              console.log(response.data);
            })
            .catch(function (error) {
              console.log(error);
            });
    })

}
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
                    var contents = scontent[0][0];
                    console.log(scontent);
                    sendMessage(msisdn,message,contents);
                    
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
