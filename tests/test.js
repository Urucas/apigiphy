import apigiphy from '../lib/';
import {api_key} from './config';

describe("Apigiphy instance test", () => {
  
  var giphy = apigiphy({api_key:api_key});
  it("Test rating method", (done) => {
    let rating = giphy.rating;
    if(rating("y")!="y") 
      throw new Error("rating method fail while testing 'y' param");
    
    if(rating("g")!="g") 
      throw new Error("rating method fail while testing 'g' param");
    
    if(rating("pg")!="pg") 
      throw new Error("rating method fail while testing 'pg' param");
    
    if(rating("pg-13")!="pg-13") 
      throw new Error("rating method fail while testing 'pg-13' param");
    
    if(rating("r")!="r") 
      throw new Error("rating method fail while testing 'r' param");
      
    done();
  });
  
  it("Test api_url method", (done) => {
    let url = giphy.api_url("gifs/search");
    if(!url.match(/http:\/\/api.giphy.com\/v1\/gifs\/search/))
      throw new Error("API base URL error");

    done();
  });

  it("Test api_key is setted", (done) => {
    if(giphy.key() == undefined || giphy.key() != api_key) {
      throw new Error("Error setting api_key!");
    }
    done();
  });

  it("Test trending method", (done) => {
    try {
      giphy.trending().then(function(response){
        if(response.meta.status == 200) done();
        else throw new Error(response.meta.msg);
      })
    }catch(e){
      throw new Error(e.getMessage);  
    }
  });

  it("Test search method", (done) => {
    try {
      giphy.search({q:"test"}).then(function(response){
        if(response.meta.status == 200) done();
        else throw new Error(response.meta.msg);
      })
    }catch(e){
      throw new Error(e.getMessage);  
    }
  });

  it("Test random method", (done) => {
    try {
      giphy.random({tag:"test"}).then(function(response){
        if(response.meta.status == 200) done();
        else throw new Error(response.meta.msg);
      })
    }catch(e){
      throw new Error(e.getMessage);  
    }
  });

});
