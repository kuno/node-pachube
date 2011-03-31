/**
* @require
*/
var request           = require('./http.js').request,
    makeKeyOptions    = require('./utils.js').makeKeyOptions,
    makeFeedOptions   = require('./utils.js').makeFeedOptions,
    defaultDataFormat = require('../include/meta.js').defaultDataFormat;


/**
* Create an instance of Feed
*
* @constructor {Feed}
* @this        {Feed}
* @param       {string} masterApikey Your pachube api key.
*/
function Feed(masterApikey) {
  /** @private */ this.masterApiKey = masterApikey;
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
  request(this.masterApiKey, options, callback, dataFormat);
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
  request(this.masterApiKey, options, callback, dataFormat , dataFile);
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
  request(this.masterApiKey, options, callback, dataFormat);
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
  var options         = makeFeedOptions('PUT', feedID.toString());
  var dataFormat      = optionalDataFormat  || defaultDataFormat;
  request(this.masterApiKey, options, callback, dataFormat, dataFile);
};


/**
* Delete feed: DELETE /v2/feeds/<feed_id>
*
* @this  {Feed}
* @param {number}   feedID   The feed id.
* @param {function} callback The callback function. 
*/ 
Feed.prototype.delete = function(feedID, callback) {
  var options = makeFeedOptions('DELETE', feedID.toString());
  request(this.masterApiKey, options, callback);
};


Feed.prototype.listKey = function(feedID, callback, optionalDataFormat) {
  var id               = timestamp || streamID || feedID;
  var options          = makeKeyOptions('GET', this, id.toString());
  var dataFormat       = optionalDataFormat || defaultDataFormat;
  request(this.masterApiKey, options, callback, dataFormat);
};


Feed.prototype.createKey = function(feedID, dataFile, callback, optionalDataFormat) {
  var id                 = timestamp || streamID || feedID;
  var options            = makeKeyOptions('POST', this, id.toString());
  var dataformat         = optionalDataFormat || defaultDataFormat;
  request(this.masterApiKey, options, callback, dataFormat, dataFile);
};


Feed.prototype.readKey = function(feedID, keyID, callback, optionalDataFormat) {
  var id               = timestamp || streamID || feedID;
  var options          = makeKeyOptions('GET', this, id.toString(), keyID);
  var dataFormat       = optionalDataFormat || defaultDataFormat;
  request(this.masterApiKey, options, callback, dataFormat);
};


Feed.prototype.deleteKey = function(feedID, keyID, callback) {
  var id                 = timestamp || streamID || feedID; 
  var options            = makeKeyOptions('GET', this, id.toString(), keyID);
  request(this.masterApiKey, options, callback);
};


Feed.prototype.history = function(start, end, interval, callback, optionalDataFormat) {
  var data = new Date();
  var parameters = {start: start ? start : date.toISOString(),
    end: end ? end : data.toISOString(), interval: interval ? interval : 0};
  var id = steamID || feedID;
  var options        = makeHistoryOptions('GET', this, id.toString(), parameters);
  var dataFormat     = optionalDataFormat || defaultDataFormat;
  request(this.masterApiKey, options, callback, dataFormat);
};
/**
* @export
*/
module.exports = Feed;
