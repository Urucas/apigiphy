// es6 runtime requirements
require('babel/polyfill');
import request from 'request';

export default function apigiphy({
  api_key
}){
  return {
    key: function() {
      return api_key;
    },
    search: function(params){
      let self = this;
      return new Promise(function(resolve, reject){
        // validate search params
        if(!params.q) reject({error:"q param not defined"});
        let qs = {
          q: params.q,
          limit : ~~params.limit > 0 ? params.limit : 25,
          offset : ~~params.offset,
          api_key : api_key,
          rating : self.rating(params.rating)
        };
        let endpointPrefix = params.stickers ? "stickers" : "gifs";
        let url = self.api_url(endpointPrefix + "/search");
        request.get({url:url, qs:qs}, function(error, response, body){
          if(error) reject(error);
          if(response.statusCode !== 200) reject(body);
          resolve(JSON.parse(body));
        });
      });
    },
    random: function(params) {
      let self = this;
      return new Promise(function(resolve, reject){
        //validate random params
        if(!params.tag) reject({error: "tag param not defined"});
        let qs = {
          tag: params.tag,
          api_key: api_key,
          rating: self.rating(params.rating)
        };
        let endpointPrefix = params.stickers ? "stickers" : "gifs";
        let url = self.api_url(endpointPrefix + "/random");
        request.get({url:url, qs:qs}, function(error, response, body){
          if(error) reject(error);
          if(response.statusCode !== 200) reject(body);
          resolve(JSON.parse(body));
        });
      });
    },
    trending: function(params){
      if (!params) params = {};
      let self = this;
      return new Promise(function(resolve, reject){
        let qs = {
            api_key: api_key,
            limit: ~~params.limit > 0 ? params.limit : 25,
            rating: self.rating(params.rating)
        };
        let endpointPrefix = params.stickers ? "stickers" : "gifs";
        let url = self.api_url(endpointPrefix + "/trending");
        request.get({url:url, qs:qs}, function(error, response, body){
          if(error) reject(error);
          if(response.statusCode !== 200) reject(body);
          resolve(JSON.parse(body));
        });
      });
    },
    rating: function(r) {
      return ['y','g','pg','pg-13','r'].indexOf(r) !== -1 ? r : "";
    },
    api_url: function(request_url) {
      let api_endpoint = "http://api.giphy.com";
      let api_version  = "v1";
      return [
        api_endpoint,
        api_version,
        request_url
      ].join('/');
    }
  };
}
