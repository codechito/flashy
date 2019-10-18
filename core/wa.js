var request = require('request');

var botId = 'b6388cf0-5ac9-4bda-99a3-a793ca8ff05b';
var bearerToken = 'ZUWqwIO89J.B9L9bSgevv.B7GfrJcaGG';
var baseUrl = 'https://us1.whatsapp.api.sinch.com/whatsapp/v1/' + botId;

module.exports = function(emitter){

    emitter.registerHook('wa::optin::send',function(options){
        return new Promise(function(resolve,reject){

            request({
                url: baseUrl + '/provision/optin',
                method: 'POST',
                headers: [
                    {
                        'Authorization': 'Bearer ' + bearerToken,
                        'Content-Type': 'application/json'
                    }
                ],
                body: {
                    numbers: options.numbers
                }
            },function(error,response,body){
              var content = response ? response.body : body;
              if(error){
                reject(error);
              }
              if(content){
                resolve(content);
              }
            });
        });
    });

    emitter.registerHook('wa::welcome::send',function(options){
        return new Promise(function(resolve,reject){

            request({
                url: baseUrl + '/messages',
                method: 'POST',
                headers: [
                    {
                        'Authorization': 'Bearer ' + bearerToken,
                        'Content-Type': 'application/json'
                    }
                ],
                body: {
                    to: [options.phoneNbr],
                    message: {
                        type: 'template',
                        template_name: 'burst_ticket_update',
                        params: options.extras
                    }
                }
            },function(error,response,body){
              var content = response ? response.body : body;
              if(error){
                reject(error);
              }
              if(content){
                resolve(content);
              }
            });
        });
    });

    emitter.registerHook('wa::message::send',function(options){
        return new Promise(function(resolve,reject){

            request({
                url: baseUrl + '/messages',
                method: 'POST',
                headers: [
                    {
                        'Authorization': 'Bearer ' + bearerToken,
                        'Content-Type': 'application/json'
                    }
                ],
                body: {
                    to: [options.phoneNbr],
                    message: {
                        "type": "text",
                        "preview_url": false,
                        "text": options.message
                    }
                }
            },function(error,response,body){
              var content = response ? response.body : body;
              if(error){
                reject(error);
              }
              if(content){
                resolve(content);
              }
            });
        });
    });
};