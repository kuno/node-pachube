var join       = require('path').join,
    host       = require('../include/meta.js').host,
    apiVersion = require('../include/meta.js').apiVersion;

// Make http options for feed object
exports.makeFeedOptions = function(method, feedID, parameters) {
  var path, query = '', i = 0;

  path = join('/', apiVersion, 'feeds', feedID || '');
  if (parameters) {
    parameters.forEach(function(p) {
        query += p.key;
        query += '=';
        query += p.value;
        if (i < parameters.length - 1) {
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
