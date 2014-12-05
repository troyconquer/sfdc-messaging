(function () {
  'use strict';

  var express = require('express');
  var parseXml = require('./middleware').parseXml;

  var app = express();

  //middleware
  app.use(parseXml);

  //handles inbound to sfdc
  // app.post('/sfdc-in', function(req, res) {});

  //handles outbound from sfdc
  app.post('/sfdc-out', function(req, res) {
    console.dir(req.message);
    if(!req.body) {
      console.log('[POST] no body found');
      return res.send(400);
    } else {
      return res.send(200);
    }
  });

  var server = app.listen(process.env.PORT || 3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('SFDC app listening at http://%s:%s', host, port);
  });
})();
