"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

module.exports = apigiphy;
// es6 runtime requirements
require("6to5/polyfill");
var request = _interopRequire(require("request"));

function apigiphy(_ref) {
  var api_key = _ref.api_key;
  return {
    search: function (params) {
      var self = this;
      return new Promise(function (resolve, reject) {
        // validate search params
        if (!params.q) reject({ error: "q param not defined" });
        var qs = {
          q: params.q,
          limit: ~ ~params.limit > 0 ? params.limit : 25,
          offset: ~ ~params.offset,
          api_key: api_key,
          rating: self.rating(params.rating)
        };
        var url = self.api_url("gifs/search");
        request.get({ url: url, qs: qs }, function (error, response, body) {
          if (error) reject(error);
          if (response.statusCode != 200) reject(body);
          resolve(JSON.parse(body));
        });
      });
    },
    random: function (params) {
      var self = this;
      return new Promise(function (resolve, reject) {
        //validate random params
        if (!params.tag) reject({ error: "tag param not defined" });
        var qs = {
          tag: params.tag,
          api_key: api_key,
          rating: self.rating(params.rating)
        };
        var url = self.api_url("gifs/random");
        request.get({ url: url, qs: qs }, function (error, response, body) {
          if (error) reject(error);
          if (response.statusCode != 200) reject(body);
          resolve(JSON.parse(body));
        });
      });
    },
    trending: function () {
      var self = this;
      return new Promise(function (resolve, reject) {
        var qs = { api_key: api_key };
        var url = self.api_url("gifs/trending");
        request.get({ url: url, qs: qs }, function (error, response, body) {
          if (error) reject(error);
          if (response.statusCode != 200) reject(body);
          resolve(JSON.parse(body));
        });
      });
    },
    rating: function (r) {
      return ["y", "g", "pg", "pg-13", "r"].indexOf(r) != -1 ? r : "";
    },
    api_url: function (request_url, params) {
      var api_endpoint = "http://api.giphy.com";
      var api_version = "v1";
      return [api_endpoint, api_version, request_url].join("/");
    }
  };
}

