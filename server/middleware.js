(function () {
  'use strict';

  var parseString = require('xml2js').parseString;
  var parseMessage = require('./parseMessage');

  module.exports.parseXml = function(req, res, next) {
    //unnecessary check
    if (req.method === 'POST') {
      var xmlData = '';
      req.setEncoding('utf8');

      req.on('xmlData', function(chunk) {
        xmlData += chunk;
      });

      req.on('end', function(){
        parseString(xmlData, function(err, jsBody) {
          if(err) {
            req.message = '';
            next();
          } else {
            //simpler message
            req.message = parseMessage.getJson(jsBody);
            next();
          }
        });
      });

    }
    else {
      req.message = 'Bad request';
      next();
    }
  };
})();
