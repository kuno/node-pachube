/**
* @requires
*/
var DataStream            = require('./dataStream.js'),
    request               = require('./http.js').request,
    makeDataPointOptions  = require('./utils.js').makeDataPointOptions,
    defaultDataFormat     = require('../include/meta.js').defaultDataFormat;


/**
* Create an instance of DataPoint
*
* @constructor {DataPoint}
* @this        {DataPoint}
* @param       {string}     apiKey Your pachube api key.
*/
function DataPoint(apiKey, feedID, streamID) {
  /** @private */this.API_KEY  = apiKey;
  /** @private */this.feedID   = feedID.toString();
  /** @private */this.streamID = streamID.toString();
}

/**
* @inheritance DataStream
*/
DataPoint.prototype = DataStream.prototype;


/**
* Create datapoint: POST /v2/feeds/<feed_id>/datastreams/<datastream_id>/datapoints
* 
* @this    {DataPoint}
* @param   {function} callback           The callback function.
* @param   {string}   optionalDataFormat Optional data format parameter, json, xml or csv, default to json.
* @returns {string}                      HTTP headers only
*/
DataPoint.prototype.create = function(callback, optionalDataFormat) {
  var options              = makeDataPointOptions('POST', this.feedID, this.streamID);
  var dataFormat           = optionalDataFormat || defaultDataFormat;
  request(this.API_KEY, options, callback, dataFormat);
};


/**
* Read datapoint: GET /v2/feeds/<feed_id>/datastreams/<datastream_id>/datapoints/<timestamp>
*
* @this    {DataPoint}
* @param   {string}   timestamp          The timestamp for data point.
* @param   {function} callback           The callback function.
* @param   {string}   optionalDataFormat Optional data format parameter, json, xml for csv, default to json.
* @returns {string}                      datapoint
*/
DataPoint.prototype.read = function(timestamp, callback, optionalDataFormat) {
  var options            = makeDataStreamOptions('GET', this.feedID, this.streamID, timestamp);
  var dataFormat         = optionalDataFormat || defaultDataFormat;
  request(this.API_KEY, options, callback, dataFormat);
};


/**
* @exports
*/
module.exports = DataPoint;
