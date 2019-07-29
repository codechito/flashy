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

  router.post('/message/send/json', function(req, res) {

    if(req.body.msisdn && req.body.resource){
      console.log(req.body.resource);
      let r = emitter.invokeHook("rbm::agent::message::create",{msisdn: req.body.msisdn, resource: req.body.resource  }); 
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

  router.post('/message/send', function(req, res) {

    if(req.body.msisdn && req.body.resource){
      console.log(req.body.resource);
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
    
    var options = {
      table: "Campaign",
      content: {name:{"$ne": null},status:true},
      limit: req.query.limit,
      skip: req.query.skip,
      sort: req.query.sort || {}
    };

    let r = emitter.invokeHook("db::find",options);

    r.then(function(content){
      res.render('rcs',{campaigns:JSON.stringify(content[0])});
    },function(err){
      console.log("chito");
      res.status(500).json({ error:err });
    });

  });
  router.get('/demo/:id', function(req, res, next) {
    var id = req.params.id;
    if(req.query.templates){
      id = req.query.templates;
    }
    var options = {
      table: "Template",
      content: {_id:id},
      limit: req.query.limit,
      skip: req.query.skip,
      sort: req.query.sort || {}
    };

    let r = emitter.invokeHook("db::find",options);

    r.then(function(templates){
      templates[0].forEach(function(template){
        if(id == template._id){
          res.render('demoedit',{templates:JSON.stringify(templates[0]), template: JSON.stringify(template)});
        }
      });
      
    },function(err){
      console.log("chito");
      res.status(500).json({ error:err });
    });

 });
  router.get('/demo', function(req, res, next) {
    if(req.query.templates){
      var options = {
        table: "Template",
        content: {_id:req.query.templates},
        limit: req.query.limit,
        skip: req.query.skip,
        sort: req.query.sort || {}
      };
  
      let r = emitter.invokeHook("db::find",options);
  
      r.then(function(templates){
        templates[0].forEach(function(template){
          if(req.query.templates == template._id){
            res.render('demoedit',{templates:JSON.stringify(templates[0]), template: JSON.stringify(template)});
          }
        });
        
      },function(err){
        console.log("chito");
        res.status(500).json({ error:err });
      });
    }
    else{
      res.render('demo');
    }

 });

  router.get('/card', function(req, res, next) {
    
    res.render('card');

 });

  router.get('/basic', function(req, res, next) {
    
    res.render('basic');

  });


  router.get('/:id', function(req, res, next) {
    
    var options = {
      table: "Campaign",
      content: {name:{"$ne": null},status:true},
      limit: req.query.limit,
      skip: req.query.skip,
      sort: req.query.sort || {}
    };

    let r = emitter.invokeHook("db::find",options);

    r.then(function(campaigns){
      campaigns[0].forEach(function(campaign){
        if(req.params.id == campaign._id){
          res.render('editrcs',{campaigns:JSON.stringify(campaigns[0]), campaign: JSON.stringify(campaign)});
        }
      });
      
    },function(err){
      console.log("chito");
      res.status(500).json({ error:err });
    });
    
  });

  return router;
};