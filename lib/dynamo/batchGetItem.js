"use strict";

var transform = require("../transform");

module.exports = function batchGetItem(client, params) {

  return new Promise(function (resolve, reject) {

    // Transform Keys
    Object.keys(params.RequestItems).forEach(function(table) {
      params.RequestItems[table].Keys = params.RequestItems[table].Keys.map(function (key) {
        return transform.to(key);
      });
    });
    
    client.endpoint.batchGetItem(params, function (err, res) {

      if(err) {
        reject(err);
        return;
      }
      
      if(res) {
        // Retransform
        Object.keys(res.Responses).forEach(function(table) {
          res.Responses[table] = res.Responses[table].map( function(item) {
            return transform.from(item);
          });
        });
        
        resolve(res);
      }

    });
  });
}