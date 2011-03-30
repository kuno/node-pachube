var join       = require('path').join,
    host       = require('../include/meta.js').host,
    apiVersion = require('../include/meta.js').apiVersion;

exports.makeFeedOptions = function(method, id, parameters) {
  var path, query = '', i = 0;

  path = join('/', apiVersion, 'feeds', id || '');
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
