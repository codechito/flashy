const PubSub = require('@google-cloud/pubsub');
const config = require("config");
const uuidv4 = require('uuid/v4');
let {google} = require('googleapis');
let rbm = require(__dirname + '/../rcsbusinessmessaging/v1');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

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
        message_id = uuidv4();
        let params = {
          parent: 'phones/' + options.msisdn,
          messageId: message_id,
          auth: emitter._authClient,
          resource: options.resource, 
        };
        emitter._rbmApi.phones.agentMessages.create(params, options.resource, function(err,response) {
          if(err){
            console.log(err);
            reject("Problem sending the message!");
          }
          if(response){
            emitter.registerHook("rbm::agent::event::response::"+message_id,function(options){
              return new Promise(function(cresolve, creject){
                cresolve(true);
                resolve({
                  status : response.status,
                  statusText : response.statusText
                });         
              })
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

  emitter.registerHook('rcs::smart::send',function(options){

    const sendRCS = function(msisdn,resource){
      return new Promise(function(resolve,reject){
        if(msisdn && resource){
          let r = emitter.invokeHook("rbm::agent::message::create",{msisdn: msisdn, resource: resource }); 
          r.then(function(scontent){
            resolve(scontent);
          },function(err){
            reject(err);
          });
        }
        else{
          reject("Mobile Number and Content Message is required!");
        }

      });
    };

    return new Promise(function(resolve, reject){

      let contentMessage = options.content;
      let msisdn = options.msisdn;
      let question = options.question;
      console.log(JSON.stringify(contentMessage));
      if(contentMessage.text){
        let p = sendRCS(msisdn,{contentMessage:contentMessage});
        p.then(function(scontent){
          resolve(scontent);
        },function(err){
          reject(err);
        });
      }
      else{
        let p = sendRCS(msisdn,{contentMessage:{text:question}});
        p.then(function(scontent){
          let q = sendRCS(msisdn,{contentMessage:contentMessage});
          q.then(function(scontent){
            resolve(scontent);
          },function(err){
            reject(err);
          });
        },function(err){
          reject(err);
        });
      }

    });

  });

  emitter.registerHook('rcs::format::message',function(options){

    return new Promise(function(resolve, reject){

      try{
        let message = options.message;
        let cid = options.id
        let question = message.question;
        let suggestions = message.suggestions;

        let contentMessage = {
          text: question,
          suggestions : []
        }; 

        
        suggestions.forEach(function(suggestion){
          
            if(suggestion.Type == "Text"){
              contentMessage.suggestions.push(
                {
                  reply: {
                      text: suggestion.Value,
                      postbackData: suggestion.Trigger + '|' + (suggestion._id || uuidv4()) + '|' + (cid || uuidv4())
                  }
                }
              );
            }
            if(suggestion.Type == "Image"){
              delete contentMessage.text;
              if(!contentMessage.richCard){
                contentMessage.richCard = {
                  carouselCard :{
                    cardWidth: 'MEDIUM',
                    cardContents:[]
                  }
                }
              }
              let imgObj = {
                media: {
                  height: "MEDIUM",
                  contentInfo: {
                      fileUrl: suggestion.FileUrl ,
                      forceRefresh: false,
                  },
                },
                suggestions: [
                  {
                    reply: {
                      text: suggestion.Value,
                      postbackData: suggestion.Trigger + '|' + (suggestion._id || uuidv4()) + '|' + (cid || uuidv4())
                    }
                  }
                ],
                title: suggestion.Title,
                description: suggestion.Description
              };
              contentMessage.richCard.carouselCard.cardContents.push(imgObj);
            }
            if(suggestion.Type == "Product"){
              delete contentMessage.text;
              if(!contentMessage.richCard){
                contentMessage.richCard = {
                  carouselCard :{
                    cardWidth: 'MEDIUM',
                    cardContents:[]
                  }
                }
              }
              let imgObj = {
                media: {
                  height: "MEDIUM",
                  contentInfo: {
                      fileUrl: suggestion.FileUrl ,
                      forceRefresh: false,
                  },
                },
                suggestions: [
                  {
                    reply: {
                      text: suggestion.Description,
                      postbackData: suggestion.Trigger + '|' + (suggestion._id || uuidv4()) + '|' + (cid || uuidv4())
                    }
                  }
                ],
                title: suggestion.Description,
                description: suggestion.Quantity + " " + suggestion.Description + " for only " + suggestion.Price
              };
              contentMessage.richCard.carouselCard.cardContents.push(imgObj);
            }
            
            if(suggestion.Type === "Action"){
 
              let option = {
                action: {
                    text: suggestion.Value,
                    postbackData: suggestion.Trigger + '|' + (suggestion._id || uuidv4()) + '|' + (cid || uuidv4())
                }
              };
              if(suggestion.Action == "Dial"){
                option.action["dialAction"] = {
                  phoneNumber: suggestion.Phone
                }
              }
              if(suggestion.Action == "View Location"){
                option.action["viewLocationAction"] = {
                  latLong: {
                    latitude: suggestion.Latitude,
                    longitude: suggestion.Longitude
                  },
                  label: suggestion.Value
                }
              }
              if(suggestion.Action == "Create Calendar"){
                option.action["createCalendarEventAction"] = {
                  startTime: suggestion.Start,
                  endTime: suggestion.End,
                  title: suggestion.Value,
                  description: suggestion.Description
                }
              }
              if(suggestion.Action == "Open URL"){
                option.action["openUrlAction"] = {
                  url: suggestion.Url
                }
              }
              contentMessage.suggestions.push(option);
            }
        });

        resolve(contentMessage);
      }
      catch(e){
        reject(e);
      }
      
    });  
  });

  emitter.registerHook('rbm::agent::receive::message',function(options){
    
    var getMessageBody = function(userEvent) {
      if (userEvent.text != undefined) {
          return userEvent.text;
      } else if (userEvent.suggestionResponse != undefined) {
          return userEvent.suggestionResponse.postbackData;
      }
  
      return false;
    };

    var replaceUserInfo = function(user,str){
      var fields = str.match(/\[.*?\]/g);
      if(fields && fields.length){
        fields.forEach(function(field){
          var fieldname = field.replace("[","").replace("]","");
          if(user[fieldname]){
            if( typeof user[fieldname] === 'object'){
              str = str.replace(field,user[fieldname].Value);
            }
            else{
              str = str.replace(field,user[fieldname]);
            }
            
          }
        });
      }
      return str;
      
    };

    var handleMessage = function(userEvent){
      if (userEvent.senderPhoneNumber != undefined && (userEvent.text || userEvent.suggestionResponse)) {
        let msisdn = userEvent.senderPhoneNumber;
        let message = getMessageBody(userEvent);
        let messageId = userEvent.messageId;

        let r = emitter.invokeHook("rbm::agent::event::create",{msisdn: msisdn, resource: {"eventType": "READ","messageId": messageId} }); 
        r.then(function(_content){
          
          let trigger = message.split("|")[0];
          let suid = message.split("|")[1];
          let cid = message.split("|")[2];
          let options = {
            table: "Campaign",
            content: { "_id" : cid}
          }; 
          
          let s = emitter.invokeHook("db::find",options);
          s.then(function(scontent){
            console.log(scontent);
            if(scontent[0] && scontent[0][0]){
              let msg, sgstn, tmsg;
              scontent[0][0].messages.forEach(function(smsg){
                if(smsg.name === trigger){
                  msg = smsg;
                }
                smsg.suggestions.forEach(function(ssgstn){
                  if(ssgstn._id == suid){
                    sgstn = ssgstn;
                    tmsg = smsg.name;
                  }
                });
              });
              console.log("trigger",trigger,"suid",suid,"cid",cid);
              let responses = JSON.parse(scontent[0][0].responses||null);

              if(!responses){
                responses = {};
              }
              if(responses && !responses[msisdn]){
                responses[msisdn] = {}
              }
              if(sgstn.Type == "Product"){
                responses[msisdn][tmsg] = {
                  Quantity : sgstn.Quantity,
                  Description : sgstn.Description,
                  Price : sgstn.Price,
                  Value : sgstn.Quantity + " X " + sgstn.Description + " - $" + sgstn.Price + "\n"
                }
              }
              else{
                responses[msisdn][tmsg] = {
                  Value : sgstn.Value
                }
              }
              
              let u = emitter.invokeHook("db::update",{ table: "Campaign", content: {responses: JSON.stringify(responses), _id: scontent[0][0]._id} });
              u.then(function(ucontent){
                if(msg){
                  let user = {
                    address : "L6, #1 Kings St, Sydney 2000"
                  };
                  msg.question = replaceUserInfo(responses[msisdn],msg.question);
                  msg.question = replaceUserInfo(user,msg.question);
                  let t = emitter.invokeHook("rcs::format::message",{ message: msg, id: scontent[0][0]._id});
                  t.then(function(tcontent){

                    let p = emitter.invokeHook("rcs::smart::send",{ content: tcontent[0], msisdn: msisdn,question: msg.question});
                    p.then(function(pcontent){
                      console.log(pcontent);
                    },function(err){
                      console.error(err);
                    });
                  },function(err){
                    console.error(err);
                  });
                }
                else{
                  console.error(message,"message not found for these callback!!");
                }
              },function(err){
                console.error(err);
              });
            }
            else{
              console.error(message,"campaign not found for these callback!!");
            }
            
          },function(err){
            console.error(err);
          });

        },function(err){
          console.error(err);
        });
      }
    };

    if(options && options.force){
      return new Promise(function(resolve){
        handleMessage(options.userEvent);
        resolve("done");
      });
    }
    else{

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
    }

  });

}