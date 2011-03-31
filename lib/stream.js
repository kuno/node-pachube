/**
* @require
*/
var Feed                  = require('./feed.js'),
    request               = require('./http.js').request,
    makeStreamOptions     = require('./utils.js').makeStreamOptions,
    defaultDataFormat     = require('../include/meta.js').defaultDataFormat;


/**
* Create an instance of Stream
*
* @constructor {Stream}
* @this        {dataStream}
* @param       {string}     masterApikey Your pachube api key.
*/
function Stream(masterApikey, feedID) {
  /** @private */this.masterApiKey = masterApikey;
  /** @private */this.feedID  = feedID.toString();
}


/**
* @inheritance Feed
*/
Stream.prototype = Feed.prototype;


/**
* Create new datastream: POST /v2/feeds/<feed_id>/datastreams
*
* @this  {Stream}
* @param {number}   feedID             The feed ID.
* @param {string}   dataFile           The path to data file.
* @param {function} callback           The callbak function.
* @param {string}   optionalDataFormat Optional data format parameter, json or xml, default to json.
*/
Stream.prototype.create = function(dataFile, callback, optionalDataFormat) {
  var options           = makeStreamOptions('POST', this.feedID);
  var dataFormat        = optionalDataFormat || defaultDataFormat;
  request(this.masterApiKey, options, callback, dataFormat, dataFile);
};


/**
* Read datastream - GET /v2/feeds/<feed_id>/datastreams/<datastream_id>
*
* @this  {Stream}
* @param {number}   feedID             The feed id.
* @param {string}   streamID           The data stream id.
* @param {function} callback           The callback function.
* @param {string}   optionalDataFormat optional data format parameter, json or xml, default to json.
*/
Stream.prototype.read = function(streamID, callback, optionalDataFormat) {
  var options         = makeStreamOptions('GET', this.feedID, streamID);
  var dataFormat      = optionalDataFormat || defaultDataFormat;
  request(this.masterApiKey, options, callback, dataFormat);
};


/**
* Update datastream: PUT /v2/feeds/<feed_id>/datastreams/<datastream_id>
*
* @this  {Stream}
* @param {number}   feedID             The feed id.
* @param {string}   streamID           The data stream id.
* @param {string}   dataFile           The path to data file.
* @param {function} callback           The callback function.
* @param {string}   optionalDataFormat Optional data format parameter, json or xml, default to json.
*/
Stream.prototype.update = function(streamID, dataFile, callback, optionalDataFormat) {
  var options           = makeStreamOptions('GET',this.feedID, streamID);
  var dataFormat        = optionalDataFormat || defaultDataFormat;
  request(this.masterApiKey, options, callback, dataFormat, dataFile);
};


/**
* Delete datastream: DELETE /v2/feeds/<feed_id>/datastreams/<datastream_id>
*
* @this    {Stream}
* @param   {number}   feedID             The feed id.
* @param   {string}   streamID           The data stream id.
* @param   {function} callback           The callback function.
* @returns {string}                      HTTP headers only
*/
Stream.prototype.delete = function(streamID, callback) {
  var options           = makeStreamOptions('DELETE', this.feedID, streamID);
  request(this.masterApiKey, options, callback);
};


/**
* @export
*/
module.exports = Stream;
