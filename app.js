var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');

var emitter = require('psharky');

require('./core/mongo')(emitter);
 var location = require('./routes/location')(emitter);
 var rcscampaign = require('./routes/rcscampaign')(emitter);
 require('./core/sequencer')(emitter);
 var campaign = require('./routes/campaign')(emitter);

 var line = require('./routes/line')(emitter);

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use('/line/webhook', line);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/campaign",express.static(path.join(__dirname, 'public')));

app.use(session({
   secret: 'wa',
   resave: true,
   saveUninitialized: true,
 }));
 
app.use('/location', location);
app.use('/campaign/rcs', rcscampaign);
app.use('/campaign', campaign);


app.all('/whatsapp/webhook', function(req,res){
   console.log("thank you for sending these:","query",req.query,"body",req.body);
   res.json("thank you for sending these");
});

app.all('/message', function(req,res){
  res.render('message');
});

app.post('/invite', function(req, res) {

  console.log(req.body.msisdn);
  res.json(req.body);

});

let s = emitter.invokeHook("rbm::agent::receive::message::worker:one");
s.then(function(result){
  console.log(result);
});

module.exports = app;
