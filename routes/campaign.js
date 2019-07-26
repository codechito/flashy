const express = require('express');
const router = express.Router();
const uuidv4 = require('uuid/v4');

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
    });

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
        console.log(content);
        res.status(200).json(content);
      },function(err){
        console.log(err);
        res.status(500).json({ error:err });
      })
    }
    else{
      res.status(500).json("No record found");
    }

  });

  router.get('/template', function(req, res) {
    let content = {};
    if(req.query.content){
      content = JSON.parse(req.query.content);
    }
    var options = {
      table: "Template",
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
    });

  });

  router.post('/template', function(req, res) {
    if(req.body.content){
      let content = JSON.parse(req.body.content);
      var options = {
        table: "Template",
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

  router.put('/template', function(req, res) {
    if(req.body.content){
      let content = JSON.parse(req.body.content);
      
      var options = {
        table: "Template",
        content: content
      };
      let r = emitter.invokeHook("db::update::bulk",options);
      r.then(function(content){
        console.log(content);
        res.status(200).json(content);
      },function(err){
        console.log(err);
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

      var options = {
        table: "Campaign",
        content: { _id : req.params.id}
      };
  
      let r = emitter.invokeHook("db::find",options);
  
      r.then(function(content){
        if(content[0][0]){
          let firstMessage = {};
          content[0][0].messages.forEach(function(message){
            if(message.sequence === 1){
              firstMessage = message;
            }
          });
          if(firstMessage){
            let r = emitter.invokeHook("rcs::format::message",{ message: firstMessage, id: content[0][0]._id});
            r.then(function(fcontent){
              let p = emitter.invokeHook("rcs::smart::send",{ content: fcontent[0], msisdn: content[0][0].msisdn,question: firstMessage.question});
              p.then(function(scontent){
                res.status(200).json(scontent);
              },function(err){
                res.status(500).json({ error:err });
              });
            },function(err){
              res.status(500).json({ error:err });
            });
          }
          else{
            res.status(500).json("Record has no 1st sequence found");
          }

        }
        else{
          res.status(500).json("No record found");
        }
      },function(err){
        res.status(500).json({ error:err });
      });
    }
    else{
      res.status(500).json("No record found");
    }

  });

  router.post('/format/rcs', function(req, res) {
    if(req.body.content){
      let content = JSON.parse(req.body.content);
      var options = {
        message: content,
        id: req.body.id
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
  
  router.get('/force/response', function(req, res){

    let options = {
      force: true,
      userEvent: {
        senderPhoneNumber: req.query.msisdn,
        messageId: req.query.messageId,
        text:req.query.text
      }
    };
    let s = emitter.invokeHook("rbm::agent::receive::message",options);
    s.then(function(result){
      res.status(200).json(result);
    });
  });

  return router;
};
