const express = require('express');
const router = express.Router();

var getIP = require('ipware')().get_ip;

module.exports = function(emitter){

  router.get('/', function(req, res) {
    var ipInfo = getIP(req);
    res.status(200).json(ipInfo);
  });
  return router;
};