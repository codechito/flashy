const PubSub = require('@google-cloud/pubsub');
const config = require("config");
const uuidv4 = require('uuid/v4');
let {google} = require('googleapis');
let rbm = require(__dirname + '/../rcsbusinessmessaging/v1');

module.exports = function(emitter){
  emitter._authClient = false; 
  emitter._rbmApi = false;
  emitter._subscription = false;

  emitter.registerHook('init::pubsub',function(options){

    return new Promise(function(resolve){
      if(!emitter._subscription){
        let pubsub = new PubSub({
          projectId: options.project_id,
          keyFilename: options.privateKeyFile,
        });
        const subscription = pubsub.subscription(options.subscriptionName);
        emitter._subscription = subscription;
      }
      resolve(emitter._subscription);
    });
  });

  emitter.registerHook('init::rbmapi',function(options){

    return new Promise(function(resolve,reject){
      if(!emitter._rbmApi || !emitter._authClient){
        try{
        let authClient = new google.auth.JWT(
          options.client_email,
          null,
          options.private_key,
          options.scopes
        );
        let rbmApi = new rbm.rcsbusinessmessaging_v1.Rcsbusinessmessaging({}, google);

        authClient.authorize(function(err, tokens) {
          
          if (err) {
            reject(err);
          } else {
            
              emitter._rbmApi = rbmApi;
              emitter._authClient = authClient;
              resolve(true);
          }
        });
      }catch(e){
        console.log("it goes here");
        reject(e);
      }
      
      }
      else{
        resolve(emitter._rbmApi);
      }

    });
  });

  emitter.registerHook('rbm::tester::invite::phone',function(options){

    return new Promise(function(resolve, reject){

      var initOptions = {	
        projectId: config.project_id,
        keyFilename: config.keyFilename,
        client_email: config.client_email,
        private_key: config.private_key,
        scopes: config.scopes
      };
  
      let p = emitter.invokeHook("init::rbmapi",initOptions);
      p.then(function(content){
        let params = {parent: 'phones/' + options.msisdn, auth: emitter._authClient};
        emitter._rbmApi.phones.testers.create(params, {}, function(err,response) {
          if(err){
            console.log(err);
            reject("Problem inviting the user!");
          }
          if(response){
            resolve({
              status : response.status,
              statusText : response.statusText
            });
          } 
        });
      },function(err){
        reject(err);
      });

    });
  });

  emitter.registerHook('rbm::agent::message::create',function(options){

    return new Promise(function(resolve, reject){

      var initOptions = {	
        projectId: config.project_id,
        keyFilename: config.keyFilename,
        client_email: config.client_email,
        private_key: config.private_key,
        scopes: config.scopes
      };
      let p = emitter.invokeHook("init::rbmapi",initOptions);
      p.then(function(content){
        let params = {
          parent: 'phones/' + options.msisdn,
          messageId: uuidv4(),
          auth: emitter._authClient,
          resource: options.resource, 
        };
        emitter._rbmApi.phones.agentMessages.create(params, options.resource, function(err,response) {
          if(err){
            console.log(err);
            reject("Problem sending the message!");
          }
          if(response){
            resolve({
              status : response.status,
              statusText : response.statusText
            });
          } 
        });
      },function(err){
        reject(err);
      });

    });   
  });

  emitter.registerHook('rbm::agent::event::create',function(options){

    return new Promise(function(resolve, reject){

      var initOptions = {	
        projectId: config.project_id,
        keyFilename: config.keyFilename,
        client_email: config.client_email,
        private_key: config.private_key,
        scopes: config.scopes
      };
      let p = emitter.invokeHook("init::rbmapi",initOptions);
      p.then(function(content){
        let params = {
          parent: 'phones/' + options.msisdn,
          eventId: uuidv4(),
          auth: emitter._authClient,
          resource: options.resource, 
        };
        emitter._rbmApi.phones.agentEvents.create(params, options.resource, function(err,response) {
          if(err){
            console.log(err);
            reject("Problem sending the event!");
          }
          if(response){
            resolve({
              status : response.status,
              statusText : response.statusText
            });
          } 
        });
      },function(err){
        reject(err);
      });

    });  
  });

}