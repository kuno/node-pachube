/**
* @ requires
*/
var request            = require('./http.js').request,
    makeTriggerOptions = require('./utils.js').makeTriggerOptions,
    defaultDataFormat  = require('../include/meta.js').defaultDataFormat;

/**
* Create an instance of Trigger
*
* @constructor {Trigger}
* @this        {Trigger}
* @param       {string}  masterApikey Your pachube api key.
*/
function Trigger(masterApikey) {
  /** @private */this.masterApiKey = masterApikey;
}


/**
* List triggers: GET /v2/triggers
*
* @this  {Trigger}
* @param {function} callback The callback function.
* @param {string}   optionalDataFormat Optional data format parameter, json or xml, default to json.
*/
Trigger.prototype.list = function(callback, optionalDataFormat) {
  var options          = makeTriggerOptions('GET');
  var dataFormat       = optionalDataFormat || defaultDataFormat;
  request(this.masterApiKey, options, callback, dataFormat);
};


/**
* Create trigger: POST /v2/triggers
*
* @this  {Trigger}
* @param {string}   dataFile The path to data file.
* @param {function} callback The callback function.
* @param {string}   optionalDataFormat Optional data format parameter, json or xml, default to json.
*/
Trigger.prototype.create = function(dataFile, callback, optionalDataFormat) {
  var options            = makeTriggerOptions('POST');
  var dataFormat         = optionalDataFormat || defaultDataFormat;
  request(this.masterApiKey, options, callback, dataFormat, dataFile);
};


/**
* Delete trigger: DELETE /v2/triggers/<trigger_id>
*
* @this {Trigger}
* @param {string} triggerID The trigger id.
* @param {function} callback Optional callback function.
*/
Trigger.prototype.delete = function(triggerID, callback) {
  var options            = makeTriggerOptions('DELETE', triggerID);
  request(this.masterApiKey, options, callback);
};


/**
* @ exports
*/
module.exports = Trigger;
