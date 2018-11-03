const express = require('express');
const router = express.Router();
const config = require("config");

module.exports = function(emitter){

  require('../core/client')(emitter);
  router.get('/', function(req, res) {

    var getIP = require('ipware')().get_ip;
    var ipInfo = getIP(req);
    
    var options = {
      url: config.locatorurl + "/" + ipInfo.clientIp,            
	    method: "GET"       
    };
    
    let r = emitter.invokeHook("client::location",options);
    
    r.then(function(content){
      res.status(200).json(JSON.parse(content));
    },function(err){
      res.status(500).json({ error:err });
    });

  });
  return router;
};