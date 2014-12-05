(function () {
  'use strict';

  //code..
  module.exports = {
      getJson : function(jsBody){
        var rawSoap = jsBody['soapenv:Envelope']['soapenv:Body'][0].notifications[0];

        var message = {
          xmlns: rawSoap['$']['xmlns'],
          organizationId: rawSoap['OrganizationId'][0],
          actionId: rawSoap['ActionId'][0],
          sessionId: rawSoap['SessionId'][0],
          enterpriseUrl: rawSoap['EnterpriseUrl'][0],
          partnerUrl: rawSoap['PartnerUrl'][0],
          notification: rawSoap['Notification'][0]
        };
        return message;
      }
    };

})();
