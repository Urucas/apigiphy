var giphy = require('../node');

giphy = giphy({api_key:'dc6zaTOxFJmzC'});

/*
 * Search API Example
 *
 *
giphy.search({q:"flip the table"})
.then(function(response){
  console.log("success");
  console.log(response.data);
}, function(error){
  console.log("error");
  console.log(error);  
});
/*
 * 
 */


/*
 * Random API Example
 *
 */
giphy.random({tag:"facepalm"})
.then(function(response){
  console.log("success");
  console.log(response.data);
}, function(error){
  console.log("error");
  console.log(error);  
});

/*
 * 
 */

