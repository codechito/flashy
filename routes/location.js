const express = require('express');
const router = express.Router();
const config = require("config");

module.exports = function(emitter){

  router.get('/', function(req, res) {

    var getIP = require('ipware')().get_ip;
    var ipInfo = getIP(req);
    var options = {
      url: config.locatorurl + "/" + getIP,            
	    method: "GET",        
      ip: getIP.clientIp
    };

    let r = emitter.invokeHook("client::location",options);

    r.then(function(content){
      res.status(200).json(content);
    },function(err){
      res.status(500).json({ error:err });
    })

    res.status(200).json(ipInfo);
  });
  return router;
};