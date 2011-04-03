/**
* @ requires
*/
var request            = require('./http.js').request,
    makeKeyOptions     = require('./utils.js').makeKeyOptions,
    makeFeedOptions    = require('./utils.js').makeFeedOptions,
    makeHistoryOptions = require('./utils.js').makeHistoryOptions,
    defaultDataFormat  = require('../include/meta.js').defaultDataFormat;


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
*  @param {string}   dataSource         The data source, a path, a string or an object. 
*  @param {function} callback           The callbak function.
*  @param {string}   optionalDataFormat Optional data format parameter, json, xml csv, default to json.
*/
Feed.prototype.create = function(dataSource, callback, optionalDataFormat) {
  var options         = makeFeedOptions('POST');
  var dataFormat      = optionalDataFormat || defaultDataFormat;
  request(this.masterApiKey, options, callback, dataFormat , dataSource);
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
* @param {string}   dataSource         The data source, a path, a string or an object.  
* @param {function} callback           The callback function.
* @param {string}   optionalDataFormat Optional data format parameter, json, xml csv, default json.
*/ 
Feed.prototype.update = function(feedID, dataSource, callback, optionalDataFormat) {
  var options         = makeFeedOptions('PUT', feedID.toString());
  var dataFormat      = optionalDataFormat  || defaultDataFormat;
  request(this.masterApiKey, options, callback, dataFormat, dataSource);
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


/**
* List API keys: GET /v2/{env}/keys
*
* @this {Feed}
* @param {string|number}  The current environment id, could be feed, stream, or point id.
* @param {function}       The callback function.
* @param {string}         Optional data format parameter, could be json or xml.
*/
Feed.prototype.listKey = function(id, callback, optionalDataFormat) {
  var options          = makeKeyOptions('GET', this, id.toString());
  var dataFormat       = optionalDataFormat || defaultDataFormat;
  request(this.masterApiKey, options, callback, dataFormat);
};


/**
* Create API key: POST /v2/{env}/keys
*
* @this  {Feed}
* @param {string|number}  id                 The current environment id, could be feed, stream, or point id.
* @param {string|object}  dataSource 
* @param {function}       callback           The callback function.
* @param {string}         optionalDataFormat Optional data format parameter, could be json or xml.
*/   
Feed.prototype.createKey = function(id, dataSource, callback, optionalDataFormat) {
  var options            = makeKeyOptions('POST', this, id.toString());
  var dataformat         = optionalDataFormat || defaultDataFormat;
  request(this.masterApiKey, options, callback, dataFormat, dataSource);
};


/**
* Read API key: GET /v2/{env}/keys/<key_id>
*
* @this  {Feed}
* @param {string|number} id                 The current environment id, could be feed, stream, or point id.
* @param {string}        keyID              The key id.
* @param {function}      callback           The callback function.
* @param {string}        optionalDataFormat Optional data format parameter, could be json or xml.
*/   
Feed.prototype.readKey = function(id, keyID, callback, optionalDataFormat) {
  var options          = makeKeyOptions('GET', this, id.toString(), keyID);
  var dataFormat       = optionalDataFormat || defaultDataFormat;
  request(this.masterApiKey, options, callback, dataFormat);
};


/**
*  Delete API key: DELETE /v2/{env}/keys/<key_id>
*
* @this  {Feed}
* @param {string|number} id       The current environment id, could be feed, stream, or point id.
* @param {string}        keyID    The key id.
* @param {function}      callback The callback function.
*/   
Feed.prototype.deleteKey = function(id, keyID, callback) {
  var options            = makeKeyOptions('GET', this, id.toString(), keyID);
  request(this.masterApiKey, options, callback);
};


/**
* Historical Queries
*
* @this  {Feed}
* @param {string|number} id                  The current environment id, could be feed, stream, or point id.
* @param {string}        start               The start timestamp, e.g. 2010-05-20T11:01:46Z.
* @param {end}           end                 The end timestamp, e.g. 2010-05-21T11:01:46Z.
* @param {number}        interval            The time interval, intergel number.
* @param {function}      callback            The callback function.
* @param {string}        optionalDataFormat  Optional data format parameter, could be json or xml.
*/   
Feed.prototype.history = function(id, start, end, interval, callback, optionalDataFormat) {
  var date = new Date();
  var parameters = {};
  parameters.start = start ? start : date.toISOString();
  parameters.end = end ? end : data.toISOString();
  parameters.interval = interval ? interval : 0;

  var options        = makeHistoryOptions('GET', this, id.toString(), parameters);
  var dataFormat     = optionalDataFormat || defaultDataFormat;
  request(this.masterApiKey, options, callback, dataFormat);
};


/**
* @ exports
*/
module.exports = Feed;
