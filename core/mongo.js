const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Schema = mongoose.Schema;
const config = require("config");

const SuggestionSchema = {
  "Type": { type: String, required: true },
  "Trigger": { type: String },
  "Value": { type: String },
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
  "Quantity": { type: String },
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
  "responses": { type: String },
  "entry": { type: Date, default: Date.now },
  "status": { type: Boolean, default: true }
};

var connection = mongoose.createConnection(config.mongodburl,{useNewUrlParser: true});

var campaign = connection.model('Campaign',new Schema(CampaignSchema,{collection: 'Campaign',versionKey: false}));

var db = {
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

  emitter.registerHook('db::findById',function(options){
         
    return new Promise(function(resolve,reject){
      if(db[options.table]){
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
  
  emitter.registerHook('db::find',function(options){
         
    return new Promise(function(resolve,reject){
      if(db[options.table]){
        console.log(options.content._id);
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
  
  emitter.registerHook('db::findOne',function(options){
    
    return new Promise(function(resolve,reject){
      
      options.content["messages.suggestions._id"] = ObjectId(options.content["messages.suggestions._id"]);
       console.log("chito",options.content);  
      if(db[options.table]){
        db[options.table]
          .findOne(options.content)
          .exec(function(err,result){
         
            if(err){
                console.log("chitosss");  
              reject(err);
            }
            if(result){
                console.log("chitosss");  
              console.log(result);
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
          .updateOne({"_id" : ObjectId(options.content._id)},{$set:item},{multi: true},function(err,result){
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