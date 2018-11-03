const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const config = require("config");

const ProfileSchema = {
  "fname": { type: String, required: true },
  "lname": { type: String, required: true },
  "address": { type: String, required: true },
  "age": { type: String, required: true },
  "msisdn": { type: String, equired: true },
  "photo": { type: String, required: true },
  "description": { type: String, required: true },
  "entry": { type: Date, default: Date.now },
  "status": { type: String, required: true }
};

var connection = mongoose.createConnection(config.mongodburl,{useNewUrlParser: true});

var profile = connection.model('Profile',new Schema(ProfileSchema,{collection: 'Profile',versionKey: false}));

var db = {
  Profile : profile
};

module.exports = function(emitter){

  require('../core/mongo')(emitter,db);

  router.get('/', function(req, res, next) {

    var options = {
      table: "Profile",
      content: {},
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

  return router;
};
