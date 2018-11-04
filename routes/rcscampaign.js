const express = require('express');
const router = express.Router();
const config = require("config");

module.exports = function(emitter){

  require('../core/rcs')(emitter);

  router.post('/invite', function(req, res) {

    if(req.body.msisdn){
      let r = emitter.invokeHook("rbm::tester::invite::phone",{msisdn: req.body.msisdn});  
      r.then(function(content){
        res.status(200).json(content);
      },function(err){
        res.status(500).json({ error:err });
      });
    }
    else{
      res.status(500).json({ error:"Mobile Number is required!" });
    }

  });

  router.post('/message/send', function(req, res) {

    if(req.body.msisdn && req.body.resource){
      let r = emitter.invokeHook("rbm::agent::message::create",{msisdn: req.body.msisdn, resource: JSON.parse(req.body.resource) }); 
      r.then(function(content){
        res.status(200).json(content);
      },function(err){
        res.status(500).json({ error:err });
      });
    }
    else{
      res.status(500).json({ error:"Mobile Number and Content Message is required!" });
    }

  });

  router.post('/event/send', function(req, res) {

    if(req.body.msisdn && req.body.resource){
      let r = emitter.invokeHook("rbm::agent::event::create",{msisdn: req.body.msisdn, resource: JSON.parse(req.body.resource) }); 
      r.then(function(content){
        res.status(200).json(content);
      },function(err){
        res.status(500).json({ error:err });
      });
    }
    else{
      res.status(500).json({ error:"Mobile Number and Content Message is required!" });
    }

  });

  router.get('/', function(req, res, next) {
    res.render('rcs');
  });

  return router;
};