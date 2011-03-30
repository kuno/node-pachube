/**
* @require
*/
var request           = require('./http.js').request,
    makeFeedOptions   = require('./utils.js').makeFeedOptions,
    defaultDataFormat = require('../include/meta.js').defaultDataFormat;


/**
* Create an instance of Feed
*
* @constructor {Feed}
* @this        {Feed}
* @param       {string} apiKey Your pachube api key.
*/
function Feed(apiKey) {
  /** @private */ this.API_KEY = apiKey;
}


/**
* List all available feeds: GET /v2/feeds
*
* @this  {Feed}
* @param {object}   parameters         The parameters object.
* @param {function} callback           The callback function.
* @param {string}   OptionalDataFormat Optional data format parameter, json ,xml or csv, default json.
*/
Feed.prototype.list = function(parameters, callback, optionalDataFormat) {
  var options       = makeFeedOptions('GET', '', parameters);
  var dataFormat    = optionalDataFormat || defaultDataFormat;
  request(this.API_KEY, options, callback, dataFormat);
};


/**
* Create new feed: POST /v2/feeds
* 
*  @this {Feed}
*  @param {string}   dataFile           The path of data file.
*  @param {function} callback           The callbak function.
*  @param {string}   optionalDataFormat Optional data format parameter, json, xml csv, default to json.
*/
Feed.prototype.create = function(dataFile, callback, optionalDataFormat) {
  var options         = makeFeedOptions('POST');
  var dataFormat      = optionalDataFormat || defaultDataFormat;
  request(this.API_KEY, options, callback, dataFormat , dataFile);
};


/**
* Read feed: GET /v2/feeds/<feed_id>
*
* @this  {Feed}
* @param {number}   feedID             The feed id.  
* @param {object}   parameters         Optinal parameters object.
* @param {function} callback           The callback function.
* @param {string}   optionalDataFormat Optional data format parameter, json, xml or csv, default json.
*/ 
Feed.prototype.read = function(feedID, parameters, callback, optionalDataFormat) {
  feedID = feedID.toString();
  var options       = makeFeedOptions('GET', feedID, parameters);
  var dataFormat    = optionalDataFormat  || defaultDataFormat;
  request(this.API_KEY, options, callback, dataFormat);
};


/**
* Update feed: PUT /v2/feeds/<feed_id>
*
* @this  {Feed}
* @param {number}   feedID             The feed id.
* @param {string}   dataFile           The path to data file.
* @param {function} callback           The callback function.
* @param {string}   optionalDataFormat Optional data format parameter, json, xml csv, default json.
*/ 
Feed.prototype.update = function(feedID, dataFile, callback, optionalDataFormat) {
  feedID = feedID.toSring();
  var options         = makeFeedOptions('PUT', feedID);
  var dataFormat      = optionalDataFormat  || defaultDataFormat;
  request(this.API_KEY, options, callback, dataFormat, dataFile);
};


/**
* Delete feed: DELETE /v2/feeds/<feed_id>
*
* @this  {Feed}
* @param {number}   feedID   The feed id.
* @param {function} callback The callback function. 
*/ 
Feed.prototype.delete = function(feedID, callback) {
  feedID = feedID.toString();
  var options = makeFeedOptions('DELETE', feedID);
  request(this.API_KEY, options, callback);
};


/**
* @export
*/
module.exports = Feed;
