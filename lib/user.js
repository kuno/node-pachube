/**
* @ requires
*/
var request           = require('./http.js').request,
    makeUserOptions   = require('./utils.js').makeUserOptions,
    defaultDataFormat = require('../include/meta.js').defaultDataFormat;

/**
* Create an instance of User
*
* @constructor {User}
* @this        {User}
* @param       {string} masterApiKey Your pachube makster api key.
*/
function User(masterApiKey) {
  /** @private */this.masterApiKey = masterApiKey;
}


/**
* List all users: GET /v2/users
*
* @this  {User}
* @param {function} The callback function.
* @param {string}   Optional data format parameter, json or xml, default to json.
*/
User.prototype.list = function(callback, optionalDataFormat) {
  var options       = makeUserOptions('GET');
  var dataFormat    = optionalDataFormat || defaultDataFormat;
  request(this.masterApiKey, options, callback, dataFormat);
};


/**
* Create user: POST /v2/users
*
* @this  {User}
* @param {string}   dataFile The path to data file.
* @param {function} callback The callback function.
* @param {string}   optionalDataFormat Optional data format parameter, json or xml, default to json.
*/           
User.prototype.create = function(dataFile, callback, optionalDataFormat) {
  var options         = makeUserOptions('POST');
  var dataFormat      = optionalDataFormat || defaultDataFormat;
  request(this.masterApiKey, options, callback, dataFormat, dataFile);
};


/**
* Read user: GET /v2/users/<user_id>
*
* @this  {User}
* @param {string}   userID The login name for the user (i.e. their Pachube ID).
* @param {function} callback The callback function.
* @param {string}   optionalDataFormat Optional data format parameter, json or xml, default to json.
*/           
User.prototype.read = function(userID, callback, optionalDataFormat) {
  var options       = makeUserOptions('GET', userID);
  var dataFormat    = optionalDataFormat || defaultDataFormat;
  request(this.masterApiKey, options, callback, dataFormat);
};


/**
* Update user: PUT /v2/users/<user_login>
*
* @this  {User}
* @param {string}   userID             The login name for user (i.e. the Pachube ID).
* @param {string}   dataFile           The path to data file.
* @param {function} callback           The callback function.
* @param {string}   optionalDataFormat Optional data format parameter, json or xml, default to json.
*/  
User.prototype.update = function(userID, dataFile, callback, optionalDataFormat) {
  var options         = makeUserOptions('PUT', userID);
  var dataFormat      = optionalDataFormat || defaultDataFormat;
  request(this.masterApiKey, options, callback, dataFormat, dataFile);
};


/**
* Delete user: DELETE /v2/users/<user_login>
*
* @this  {User}
* @param {string}   userID             The login name for user (i.e. the Pachube ID).
* @param {function} callback           The callback function.
*/  
User.prototype.delete = function(userID, callback) {
  var options         = makeUserOptions('PUT', userID);
  request(this.masterApiKey, options, callback);
};


/**
* @ exports
*/
module.exports = User;
