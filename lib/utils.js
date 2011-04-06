var join       = require('path').join,
    host       = require('../include/meta.js').host,
    apiVersion = require('../include/meta.js').apiVersion;


// Make http options for feed object
exports.makeFeedOptions = function(method, feedID, parameters) {
  var path, query = '', keys, i = 0;

  path = join('/', apiVersion, 'feeds', feedID || '');

  // Assembling parameters
  if (parameters) {
    keys = Object.keys(parameters);
    keys.forEach(function(k) {
        query += k;
        query += '=';
        query += parameters[k];
        if (i < k.length - 1) {
          query += '&';
        }
        i++;
    });
  }

  return {host:host, port:80, path:path, query:query, method:method};
};


// Make http options for Stream object
exports.makeStreamOptions = function(method, feedID, streamID) {
  var path, query = '';
  path = join('/', apiVersion, 'feeds', feedID, 'datastreams', streamID || '');

  return {host:host, port:80, path:path, query:query, method:method};
};


// Make http options for Point object
exports.makePointOptions = function(method, feedID, streamID, timestamp) {
  var path, query = '';
  path = join('/', apiVersion, 'feeds', feedID, 'datastreams', streamID, 'datapoints', timestamp || '');

  return {host:host, port:80, path:path, query:query, method:method};
};


// Make http options for Trigger object
exports.makeTriggerOptions = function(method, triggerID) {
  var path, query = '';
  path = join('/', apiVersion, 'tirggers', triggerID || '');

  return {host:host, port:80, path:path, query:query, method:method};
};


// Make http options for User object
exports.makeUserOptions = function(method, userLogin) {
  var path, query = '';
  path = join('/', apiVersion, 'users', userLogin || '');

  return {host:host, port:80, path:path, query:query, method:method};
};


// Make http options for Key object
exports.makeKeyOptions = function(method, envID, keyID) {
  var path, query = '';
  var feed, stream = '', point= '';

  // feeds/feed_id/datastreams/stream_id/datapoints/timestamp 
  if (env.feedID && env.streamID) {
    feed   = join('feeds', feedID);
    stream = join('datastreams', streamID);
    point  = join('datapoints', envID);
  }
  // feeds/feed_id/datastreams/stream_id 
  else if (env.streamID && !env.feedID) {
    feed   = join('feeds', feedID);
    stream = join('datastreams', envID);
  }
  // feeds/feed_id
  else {  
    feed   = join('feeds', envID);
  }

  path = join('/', apiVersion, feed, stream, point, 'keys', keyID || '');

  return {host:host, port:80, path:path, query:query, method:method};
};


// Make http options for history method
exports.makeHistoryOptions = function(method, envID, parameters) {
  var path, query = '', feed, stream = '', keys, i = 0;

  // feeds/feed_id/datastreams/stream_id
  if (env.feedID) {
    feed   = join('feeds', feedID);
    stream = join('datastreams', envID);
  } else {  // feeds/feed_id
    feeed  = join('feeds', envID);
  }

  // Assembling parameters
  keys = Object.keys(parameters);
  keys.forEach(function(k) {
      query += k;
      query += '=';
      query += parameters[k];
      if (i < keys.length - 1) {
        query += '&';
      }
      i++;
  });

  return {host:host, port:80, path:path, query:query, method:method};
};
