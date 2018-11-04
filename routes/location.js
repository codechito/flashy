const express = require('express');
const router = express.Router();
const config = require("config");
var NodeGeocoder = require('node-geocoder');

var options = {
  provider: 'here',
  httpAdapter: 'https', 
  appId: config.appId,
  appCode: config.appCode,
  apiKey: config.apiKey, 
  formatter: null 
};
 
var geocoder = NodeGeocoder(options);

module.exports = function(emitter){

  require('../core/wrapper')(emitter);

  router.get('/', function(req, res) {

    var getIP = require('ipware')().get_ip;
    var ipInfo = getIP(req);
    
    var options = {
      url: config.locatorurl + "/" + ipInfo.clientIp,            
	    method: "GET"       
    };
    
    let r = emitter.invokeHook("wrapper::api",options);
    
    r.then(function(content){
      let loc = JSON.parse(content);
      if(loc.lat && loc.lon){
        geocoder.reverse({lat:loc.lat, lon:loc.lon})
        .then(function(result) {
          res.status(200).json(result);
        },function(err){
          res.status(500).json({ error:err });
        });
      }
      else{
        res.status(200).json(JSON.parse(content));
      }
    },function(err){
      res.status(500).json({ error:err });
    });

  });
  return router;
};