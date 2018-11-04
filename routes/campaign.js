const express = require('express');
const router = express.Router();

module.exports = function(emitter){

  router.get('/', function(req, res) {
    let content = {};
    if(req.query.content){
      content = JSON.parse(req.query.content);
    }
    var options = {
      table: "Campaign",
      content: content,
      limit: req.query.limit,
      skip: req.query.skip,
      sort: req.query.sort || {}
    };

    let r = emitter.invokeHook("db::find",options);

    r.then(function(content){
      res.status(200).json(content);
    },function(err){
      res.status(500).json({ error:err });
    })

  });

  router.post('/', function(req, res) {
    if(req.body.content){
      let content = JSON.parse(req.body.content);
      var options = {
        table: "Campaign",
        content: content
      };
      let r = emitter.invokeHook("db::insertMany",options);
      r.then(function(content){
        res.status(200).json(content);
      },function(err){
        res.status(500).json({ error:err });
      })
    }
    else{
      res.status(500).json("No record found");
    }

  });

  router.put('/', function(req, res) {
    if(req.body.content){
      let content = JSON.parse(req.body.content);
      var options = {
        table: "Campaign",
        content: content
      };
      let r = emitter.invokeHook("db::update::bulk",options);
      r.then(function(content){
        res.status(200).json(content);
      },function(err){
        res.status(500).json({ error:err });
      })
    }
    else{
      res.status(500).json("No record found");
    }

  });

  router.delete('/', function(req, res) {
    if(req.body.content){
      let content = JSON.parse(req.body.content);
      var options = {
        table: "Campaign",
        content: content
      };
      let r = emitter.invokeHook("db::remove::bulk",options);
      r.then(function(content){
        res.status(200).json(content);
      },function(err){
        res.status(500).json({ error:err });
      })
    }
    else{
      res.status(500).json("No record found");
    }

  });

  router.get('/start/:id', function(req, res) {
    if(req.params.id){

      let content = JSON.parse(req.body.content);
      var options = {
        table: "Campaign",
        content: content
      };
      let r = emitter.invokeHook("db::update::bulk",options);
      r.then(function(content){
        res.status(200).json(content);
      },function(err){
        res.status(500).json({ error:err });
      })
    }
    else{
      res.status(500).json("No record found");
    }

  });

  router.post('/format/rcs', function(req, res) {
    if(req.body.content){
      let content = JSON.parse(req.body.content);
      var options = {
        message: content  
      };
      let r = emitter.invokeHook("rcs::format::message",options);
      r.then(function(content){
        res.status(200).json(content);
      },function(err){
        res.status(500).json({ error:err });
      })
    }
    else{
      res.status(500).json("No record found");
    }

  });

  return router;
};
