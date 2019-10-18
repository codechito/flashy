const express = require('express');
const router = express.Router();
const config = require("config");

module.exports = function(emitter){

  require('../core/wa')(emitter);

  router.post('/optin', function(req, res) {

    var options = {
        numbers: [req.body.msisdn],                 
      };
      
      let r = emitter.invokeHook("wa::optin::send",options);
      
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
  router.post('/send', function(req, res) {

    res.render('wa');    

  });
  router.get('/wa', function(req, res) {

    res.render('wa');    

  });
  return router;
};