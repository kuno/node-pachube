/**
* @ requires
*/
var request           = require('./http.js').request,
    makeFeedOptions   = require('./utils.js').makeFeedOptions,
    defaultDataFormat = require('../include/meta.js').defaultDataFormat;

/**
* Create an instance of Feed
*
* @constructor {Feed}
* @this {Feed}
* @param {string} key The pachube api key.
*/
function Feed(apiKey) {
  /** @private */ this.API_EY = apiKey;
}

/**
* List all available feeds: GET /v2/feeds
*
* @this  {Feed}
* @param {object}   parameters         The parameters object.
* @param {function} callback           The callback function.
* @param {string}   OptionalDataFormat Optional data dataFormat parameter, json or xml, default json.
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
*  @param {string}   dataFile          The path of data file.
*  @param {function} callback          The callbak function.
*  @param {string}   optionalDataFormat Optional data dataFormat parameter, json or xml, default to json.
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
* @param {object}   parameters         Optinal parameters object.
* @param {number}   id                 The feed id.
* @param {function} callback           The callback function.
* @param {string}   optionalDataFormat Optional data dataFormat parameter, json or xml, default json.
*/ 
Feed.prototype.read = function(id, parameters, callback, optionalDataFormat ) {
  id = id.toString();
  var options       = makeFeedOptions('GET', id, parameters);
  var dataFormat    = optionalDataFormat  || defaultDataFormat;
  require(this.API_KEY, options, callback, dataFormat);
};

/**
* Update feed: PUT /v2/feeds/<feed_id>
*
* @this  {Feed}
* @param {number}   id                The feed id.
* @param {string}   dataFile          The path to data file.
* @param {function} callback          The callback function.
* @param {string}   optionalDataFormat Optional data dataFormat parameter, json or xml, default json.
*/ 
Feed.prototype.update = function(id, dataFile, callback, optionalDataFormat ) {
  id = id.toSource();
  var options         = makeFeedOptions('PUT', id);
  var dataFormat      = optionalDataFormat  || defaultDataFormat;
  request(this.API_KEY, options, callback, dataFormat, dataFile);
};

/**
* Delete feed: DELETE /v2/feeds/<feed_id>
*
* @this  {Feed}
* @param {number} id The feed id.
*/ 
Feed.prototype.delete = function(id) {
  id = id.toString();
  var options = makeFeedOptions('DELETE', id);
  request(this.API_KEY, options, callback);
};

/**
* @ exports
*/
module.exports = Feed;
