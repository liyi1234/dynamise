"use strict";

var transform = require("../transform");

module.exports = function scan(client, params) {
  return new Promise(function(resolve, reject) {

    params = params || {};

    client.endpoint.scan(params, function(err, res) {
      if(err) {
        reject(err);
        return;
      }

      if (res.Items) {
        res.Items = res.Items.map(function (item) {
          return transform.from(item);
        });
      }

      resolve(res);
    });
  });
};