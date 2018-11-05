const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
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
  "transaction": { type: String },
  "entry": { type: Date, default: Date.now },
  "status": { type: Boolean, default: true }
};

const SuggestionSchema = {
  "Type": { type: String, required: true },
  "Trigger": { type: String },
  "Value": { type: String, required: true },
  "Action": { type: String },
  "Phone": { type: String },
  "Latitude": { type: String },
  "Longitude": { type: String },
  "Query": { type: String },
  "Start": { type: String },
  "End": { type: String },
  "Description": { type: String },
  "Url": { type: String },
  "Title": { type: String },
  "Price": { type: String },
  "FileUrl": { type: String },
  "ThumbnailUrl": { type: String },
  "UserInfo": { type: String },
  "Sequence": { type: Number },
  "entry": { type: Date, default: Date.now },
  "status": { type: Boolean, default: true }
};
const MessageSchema = {
  "name": { type: String, required: true },
  "question": { type: String },
  "suggestions": [SuggestionSchema],
  "sequence": { type: Number },
  "status": { type: Boolean, default: true }
};

const CampaignSchema = {
  "messages": [MessageSchema],
  "name": { type: String, required: true },
  "msisdn": { type: String, required: true },
  "entry": { type: Date, default: Date.now },
  "status": { type: Boolean, default: true }
};

var connection = mongoose.createConnection(config.mongodburl,{useNewUrlParser: true});

var profile = connection.model('Profile',new Schema(ProfileSchema,{collection: 'Profile',versionKey: false}));
var campaign = connection.model('Campaign',new Schema(CampaignSchema,{collection: 'Campaign',versionKey: false}));

var db = {
  Profile : profile,
  Campaign : campaign
};

module.exports = function(emitter){

  emitter.registerHook('db::create',function(options){
         
    return new Promise(function(resolve,reject){
      if(db[options.table]){
        db[options.table].create(options.content,function(err,result){
          if(err){
            reject(err);
          }
          if(result){
            resolve(result);
          }
        });
      }
      else{
        reject("TABLE_NOT_FOUND");
      }
    });

  });

  emitter.registerHook('db::find',function(options){
         
    return new Promise(function(resolve,reject){
      if(db[options.table]){
        if(options.content._id){
          options.content._id = ObjectId(options.content._id);
        }
        db[options.table]
          .find(options.content)
          .skip(options.skip || 0)
          .limit(options.limit || 100)
          .sort(options.sort || {})
          .exec(function(err,result){
            if(err){
              reject(err);
            }
            if(result){
              resolve(result);
            }
          });
      }
      else{
        reject("TABLE_NOT_FOUND");
      }
    });

  });

  emitter.registerHook('db::update',function(options){
         
    return new Promise(function(resolve,reject){
      if(db[options.table]){
        let item = JSON.parse(JSON.stringify(options.content));
        delete item._id;
        db[options.table]
          .update({"_id" : ObjectId(content._id)},{$set:item},{multi: true},function(err,result){
            if(err){
              reject(err);
            }
            if(result){
              resolve(result);
            }
          });
      }
      else{
        reject("TABLE_NOT_FOUND");
      }
    });

  });

  emitter.registerHook('db::update::bulk',function(options){
         
    return new Promise(function(resolve,reject){
      if(db[options.table]){
        var Bulk = db[options.table].collection.initializeUnorderedBulkOp();
        options.content.forEach(function(content){
          let item = JSON.parse(JSON.stringify(content));
          delete item._id;
          Bulk.find({ "_id": ObjectId(content._id) })
              .update({
                "$set": item
              });
        })
        Bulk.execute(function(err,result){
          if(err){
            reject(err);
          }
          if(result){
            resolve(result);
          }
        });
      }
      else{
        reject("TABLE_NOT_FOUND");
      }
    });

  });

  emitter.registerHook('db::remove::bulk',function(options){
         
    return new Promise(function(resolve,reject){
      if(db[options.table]){
        var Bulk = db[options.table].collection.initializeUnorderedBulkOp();
        options.content.forEach(function(content){
          Bulk.find({ "_id": ObjectId(content._id) })
              .remove();
        })
        Bulk.execute(function(err,result){
          if(err){
            reject(err);
          }
          if(result){
            resolve(result);
          }
        });
      }
      else{
        reject("TABLE_NOT_FOUND");
      }
    });

  });

  emitter.registerHook('db::insertMany',function(options){
         
    return new Promise(function(resolve,reject){
      if(db[options.table]){
        db[options.table].insertMany(options.content,function(err,result){
          if(err){
            reject(err);
          }
          if(result){
            resolve(result);
          }
        });
      }
      else{
        reject("TABLE_NOT_FOUND");
      }
    });

  });
};