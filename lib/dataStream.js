/**
* @requires
*/
var Feed                  = require('./feed.js'),
    request               = require('./http.js').request,
    makeDataStreamOptions = require('./utils.js').makeDataStreamOptions,
    defaultDataFormat     = require('../include/meta.js').defaultDataFormat;


/**
* Create an instance of DataStream
*
* @constructor {DataStream}
* @this        {dataStream}
* @param       {string}     apiKey Your pachube api key.
*/
function DataStream(apiKey, feedID) {
  /** @private */this.API_KEY = apiKey;
  /** @private */this.feedID  = feedID.toString();
}


/**
* @inheritance Feed
*/
Data.prototype = Feed.prototype;


/**
* Create new datastream: POST /v2/feeds/<feed_id>/datastreams
*
* @this  {DataStream}
* @param {number}   feedID             The feed ID.
* @param {string}   dataFile           The path to data file.
* @param {function} callback           The callbak function.
* @param {string}   optionalDataFormat Optional data format parameter, json or xml, default to json.
*/
DataStream.prototype.create = function(dataFile, callback, optionalDataFormat) {
  var options               = makeDataStreamOptions('POST', this.feedID);
  var dataFormat            = optionalDataFormat || defaultDataFormat;
  request(this.API_KEY, options, callback, dataFormat, dataFile);
};


/**
* Read datastream - GET /v2/feeds/<feed_id>/datastreams/<datastream_id>
*
* @this  {DataStream}
* @param {number}   feedID             The feed id.
* @param {string}   streamID           The data stream id.
* @param {function} callback           The callback function.
* @param {string}   optionalDataFormat optional data format parameter, json or xml, default to json.
*/
DataStream.prototype.read = function(streamID, callback, optionalDataFormat) {
  var options             = makeDataStreamOptions('GET', this.feedID, streamID);
  var dataFormat          = optionalDataFormat || defaultDataFormat;
  request(this.API_KEY, options, callback, dataFormat);
};


/**
* Update datastream: PUT /v2/feeds/<feed_id>/datastreams/<datastream_id>
*
* @this  {DataStream}
* @param {number}   feedID             The feed id.
* @param {string}   streamID           The data stream id.
* @param {string}   dataFile           The path to data file.
* @param {function} callback           The callback function.
* @param {string}   optionalDataFormat Optional data format parameter, json or xml, default to json.
*/
DataStream.prototype.update = function(streamID, dataFile, callback, optionalDataFormat) {
  var options               = makeDataStreamOptions('GET',this.feedID, streamID);
  var dataFormat            = optionalDataFormat || defaultDataFormat;
  request(this.API_KEY, options, callback, dataFormat, dataFile);
};


/**
* Delete datastream: DELETE /v2/feeds/<feed_id>/datastreams/<datastream_id>
*
* @this  {DataStream}
* @param {number}   feedID             The feed id.
* @param {string}   streamID           The data stream id.
* @param {function} callback           The callback function.
* @returns {string} HTTP headers only
*/
DataStream.prototype.delete = function(streamID, callback) {
  var options               = makeDataStreamOptions('DELETE', this.feedID, streamID);
  request(this.API_KEY, options, callback);
};


/**
* @exports
*/
module.exports = DataStream;
