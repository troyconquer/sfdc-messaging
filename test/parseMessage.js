(function () {
  'use strict';

  var should = require('should');
  var xml2js = require('xml2js');
  var parseMessage = require('../server/parseMessage');

  var TEST_MESSAGE =
      '<?xml version="1.0" encoding="UTF-8"?>' +
      '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">' +
        '<soapenv:Body>' +
          '<notifications xmlns="http://soap.sforce.com/2005/09/outbound">' +
            '<OrganizationId>00Dd0000000gzcrEAA</OrganizationId>' +
            '<ActionId>04kd00000008StmAAE</ActionId>' +
            '"<SessionId>00Dd0000000gzcr!ARkAQAX8isuGmtPsj8gz_m3bsVuqL8KcTf3BtLGRGrb40RRWwP5jLW.gs7uvpBYWCjGaYdqVjicU5OXe.Hq.wsO9HJswcu8c</SessionId>' +
            '<EnterpriseUrl>https://na14-api.salesforce.com/services/Soap/c/26.0/00Dd0000000gzcr</EnterpriseUrl>' +
            '<PartnerUrl>https://na14-api.salesforce.com/services/Soap/u/26.0/00Dd0000000gzcr</PartnerUrl>' +
            '<Notification>' +
              '<Id>04ld000000E885fAAB</Id>' +
              '<sObject xsi:type="sf:IO__Order__c" xmlns:sf="urn:sobject.enterprise.soap.sforce.com">' +
                '<sf:Id>a01d0000006qftoAAA</sf:Id>' +
              '</sObject>' +
            '</Notification>' +
          '</notifications>' +
        '</soapenv:Body>' +
      '</soapenv:Envelope>';

  describe('Parse Message',function(){
    var jsBody;

    before(function () {
      //sim middleware
      var parseString = xml2js.parseString;
      parseString(TEST_MESSAGE, function (err, result) {
        jsBody = result;
      });
    });

    it('should have a function', function () {
      should(parseMessage).be.ok;
      // console.log(parseMessage().getJson);
      should(parseMessage.getJson).be.a.Function;
    });

    it('should parse the message', function () {
      var msgJson = parseMessage.getJson(jsBody);

      should(msgJson).be.a.Object;
      should(msgJson).have.property('organizationId');
    });
  });
})();
