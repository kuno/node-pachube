/**
* @ requires
*/
var Stream            = require('./stream.js'),
    request           = require('./http.js').request,
    makePointOptions  = require('./utils.js').makePointOptions,
    defaultDataFormat = require('../include/meta.js').defaultDataFormat;


/**
* Create an instance of Point
*
* @constructor {Point}
* @this        {Point}
* @param       {string}     masterApikey Your pachube api key.
*/
function Point(masterApikey, feedID, streamID) {
  /** @private */this.masterApiKey  = masterApikey;
  /** @private */this.feedID   = feedID.toString();
  /** @private */this.streamID = streamID.toString();
}

/**
* @inheritance DataStream
*/
Point.prototype = Stream.prototype;


/**
* Create datapoint: POST /v2/feeds/<feed_id>/datastreams/<datastream_id>/datapoints
* 
* @this    {Point}
* @param   {function} callback           The callback function.
* @param   {string}   optionalDataFormat Optional data format parameter, json, xml or csv, default to json.
* @returns {string}                      HTTP headers only
*/
Point.prototype.create = function(callback, optionalDataFormat) {
  var options          = makePointOptions('POST', this.feedID, this.streamID);
  var dataFormat       = optionalDataFormat || defaultDataFormat;
  request(this.masterApiKey, options, callback, dataFormat);
};


/**
* Read datapoint: GET /v2/feeds/<feed_id>/datastreams/<datastream_id>/datapoints/<timestamp>
*
* @this    {Point}
* @param   {string}   timestamp          The timestamp for data point.
* @param   {function} callback           The callback function.
* @param   {string}   optionalDataFormat Optional data format parameter, json, xml for csv, default to json.
* @returns {string}                      datapoint
*/
Point.prototype.read = function(timestamp, callback, optionalDataFormat) {
  var options        = makePointOptions('GET', this.feedID, this.streamID, timestamp);
  var dataFormat     = optionalDataFormat || defaultDataFormat;
  request(this.masterApiKey, options, callback, dataFormat);
};


/**
* @ exports
*/
module.exports = Point;
