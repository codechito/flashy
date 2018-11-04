const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const config = require("config");

const ProfileSchema = {
  "fname": { type: String, required: true },
  "lname": { type: String },
  "address": { type: String },
  "age": { type: String },
  "msisdn": { type: String },
  "photo": { type: String },
  "description": { type: String },
  "entry": { type: Date, default: Date.now },
  "status": { type: Boolean, default: true }
};

var connection = mongoose.createConnection(config.mongodburl,{useNewUrlParser: true});

var profile = connection.model('Profile',new Schema(ProfileSchema,{collection: 'Profile',versionKey: false}));

var db = {
  Profile : profile
};

module.exports = function(emitter){

  require('../core/mongo')(emitter,db);

  router.get('/', function(req, res) {
    let content = {};
    if(req.query.content){
      content = JSON.parse(req.query.content);
    }
    var options = {
      table: "Profile",
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
      let content = req.body.content;
      var options = {
        table: "Profile",
        content: content
      };
      let r = emitter.invokeHook("db::insertMany",options);
      r.then(function(content){
        res.status(200).json(content);
      },function(err){
        res.status(500).json({ error:err });
      })
    }

  });

  router.put('/', function(req, res) {
    if(req.body.content){
      let content = req.body.content;
      var options = {
        table: "Profile",
        content: content
      };
      let r = emitter.invokeHook("db::update::bulk",options);
      r.then(function(content){
        res.status(200).json(content);
      },function(err){
        res.status(500).json({ error:err });
      })
    }

  });

  router.delete('/', function(req, res) {
    if(req.body.content){
      let content = req.body.content;
      var options = {
        table: "Profile",
        content: content
      };
      let r = emitter.invokeHook("db::remove::bulk",options);
      r.then(function(content){
        res.status(200).json(content);
      },function(err){
        res.status(500).json({ error:err });
      })
    }

  });

  return router;
};
