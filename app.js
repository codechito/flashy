var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var emitter = require('./core/hooks');
require('./core/mongo')(emitter);
var location = require('./routes/location')(emitter);
var rcscampaign = require('./routes/rcscampaign')(emitter);
var campaign = require('./routes/campaign')(emitter);

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/campaign",express.static(path.join(__dirname, 'public')));

app.use('/location', location);
app.use('/campaign/rcs', rcscampaign);
app.use('/campaign', campaign);

let s = emitter.invokeHook("rbm::agent::receive::message");
s.then(function(result){
  console.log(result);
});

module.exports = app;
