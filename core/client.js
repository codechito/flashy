var request = require('request');

module.exports = function(emitter){

  emitter.registerHook("client::location",function(options){
    console.log("chito");        
    return new Promise(function(resolve,reject){

      request(options,function(error,response,body){
        var content = response ? response.body : body;
        if(error){
          reject(error);
        }
        if(content){
          resolve(content);
        }
      });
      console.log("chito");

    });

  });

};