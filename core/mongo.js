const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Schema = mongoose.Schema;
const config = require("config");
const uuidv4 = require('uuid/v4');

const SuggestionSchema = {
  "_id": { type: String, default: uuidv4() },
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

const ButtonSchema = {
  "type": { type: String },
  "label": { type: String },
  "url": { type: String },
  "calllabel": { type: String },
  "phone": { type: String },
  "starttime": { type: String },
  "endtime": { type: String },
  "calendartitle": { type: String },
  "calendardescription": { type: String },
  "latitude": { type: String },
  "longitude": { type: String },
  "locationlabel": { type: String },
};

const ImageSchema = {
  "imageurl": { type: String },
  "title": { type: String },
  "description": { type: String },
  "label": { type: String },
  "url": { type: String },
  "buttons": [ButtonSchema],
};


const MessagesSchema = {
  "type": { type: String, required: true },
  "message": { type: String },
  "imageurl": { type: String },
  "tnurl": { type: String },
  "orientation": { type: String },
  "alignment": { type: String },
  "height": { type: String },
  "width": { type: String },
  "label": { type: String },
  "url": { type: String },
  "title": { type: String },
  "description": { type: String },
  "alignment": { type: String },
  "images": [ImageSchema],
  "buttons": [ButtonSchema],
  
  "sequence": { type: Number },
};

const TemplateSchema = {
  "name": { type: String },
  "messages": [MessagesSchema]
};

const CampaignSchema = {
  "messages": [MessageSchema],
  "name": { type: String, required: true },
  "msisdn": { type: String, required: true },
  "responses": { type: String },
  "entry": { type: Date, default: Date.now },
  "status": { type: Boolean, default: true }
};

const MessageSetSchema = {
  "agent": { type: String },
  "campaign_name": { type: String },
  "recipients": { type: String },
  "messages": [{
    "message_name": { type: String },
    "uuidv4": { type: String },
    "elements": [{
      "type": { type: String },
      "message": { type: String },
      "imageurl": { type: String },
      "orientation": { type: String },
      "alignment": { type: String },
      "tnurl": { type: String },
      "title": { type: String },
      "description": { type: String },
      "width": { type: String },
      "height": { type: String },
      "card_suggestions": [{
        "type": { type: String },
        "label": { type: String },
        "callback": { type: String },
        "url": { type: String },
        "phoneNumber": { type: String },
        "startTime": { type: String },
        "endTime": { type: String },
        "title": { type: String },
        "description": { type: String },
        "latitude": { type: String },
        "longitude": { type: String },
      }],
      "images": [{
        "imageurl": { type: String },
        "title": { type: String },
        "description": { type: String },
        "card_suggestions": [{
          "type": { type: String },
          "label": { type: String },
          "callback": { type: String },
          "url": { type: String },
          "phoneNumber": { type: String },
          "startTime": { type: String },
          "endTime": { type: String },
          "title": { type: String },
          "description": { type: String },
          "latitude": { type: String },
          "longitude": { type: String },
        }]
      }],
      "suggestions": [{
        "type": { type: String },
        "label": { type: String },
        "callback": { type: String },
        "url": { type: String },
        "phoneNumber": { type: String },
        "startTime": { type: String },
        "endTime": { type: String },
        "title": { type: String },
        "description": { type: String },
        "latitude": { type: String },
        "longitude": { type: String },
      }],
    }]
  }],
}


var connection = mongoose.createConnection(config.mongodburl,{useNewUrlParser: true});

var campaign = connection.model('Campaign',new Schema(CampaignSchema,{collection: 'Campaign',versionKey: false}));

var template = connection.model('Card',new Schema(TemplateSchema,{collection: 'Template',versionKey: false}));

var MessageSet = connection.model('MessageSet',new Schema(MessageSetSchema,{collection: 'MessageSet',versionKey: false}));


var db = {
  Campaign : campaign,
  Template : template,
  MessageSet: MessageSet
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
          .updateOne({"_id" : ObjectId(options.content._id)},item,{multi: true},function(err,result){
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