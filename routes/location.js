const express = require('express');
const router = express.Router();
const config = require("config");
var NodeGeocoder = require('node-geocoder');

var options = {
  provider: 'here',
  httpAdapter: 'https', 
  appId:'YOSuV5AJuLkuOGi1fjr2',
  appCode:'iO_9gr6VR5ScPo4tjqagHw',
  apiKey: 'AIzaSyBlBP7JAQ2uaZRqDBo4mqEACfPI9HBuGws', 
  formatter: null 
};
 
var geocoder = NodeGeocoder(options);

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
      let loc = JSON.parse(content);
      if(loc.lat && loc.lon){
        console.log(loc);
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