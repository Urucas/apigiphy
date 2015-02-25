# apigiphy [![Build Status](https://travis-ci.org/Urucas/apigiphy.svg?branch=master)](https://travis-ci.org/Urucas/apigiphy)

Giphy API made simple. 

*A node implementation of Giphy API requests. Check [GiphyApi](https://github.com/Giphy/GiphyAPI) for more info.*

Install
=======
```bash
npm install --save apigiphy
```

Usage
=====
```javascript
var giphy = require('apigiphy');
giphy = giphy({api_key:YOUR_GIPHY_API_KEY});
giphy.random({tag:"flip the table"})
.then(function(response){
  console.log(response.data.image_original_url);
  // http://s3.amazonaws.com/giphymedia/media/2jlDkaipGfgGc/200_d.gif
}, function(error){
  console.log(error);  
});

```
<img src="http://s3.amazonaws.com/giphymedia/media/2jlDkaipGfgGc/200_d.gif" />

Implemented methods
==================
```javascript
.search({
  q: q, // search query term or phrase
  limit: limit, // (optional) number of results to return, maximum 100. Default 25
  offset: offset, // (optional) results offset, defaults to 0
  rating: rating // limit results to those rated (y,g, pg, pg-13 or r).
}).then(success, error);

.random({
  tag: tag, // the GIF tag to limit randomness by
  rating: rating // limit results to those rated (y,g, pg, pg-13 or r).
}).then(success, error);

.trending().then(success, error);
```

**Run the example**
```bash
git clone https://github.com/Urucas/apigiphy.git && cd apigiphy
make clean && make
node example/simple.js
```
