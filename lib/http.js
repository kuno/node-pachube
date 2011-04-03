var fs   = require('fs'),
    path = require('path'),
    http = require('http');

exports.request = function(masterApiKey, options, callback, dataFormat, dataSource) {
  var req = http.request(options, function(res) {
      var data = '';
      res.setEncoding('utf8');
      res.on('data', function(chunk) {
          data += chunk;
      });
      res.on('end', function() {
          callback(data);
      });
  });

  if (dataFormat == 'xml') {
    req.setHeader('Accept', 'application/xml');
  } else if (dataFormat == 'csv') {
    req.setHeader('Accept', 'application/csv');
  } else {
    req.setHeader('Accept', 'application/json');
  }

  if (dataSource) {
    if (path.existsSync(dataSource)) {            // data source is a path
      req.write(fs.readFileSync(dataSource));
    } else if (typeof dataSource === 'object') {  // data source is an object
      req.write(JSON.stringify(dataSource));
    } else if (typeof dataSource === 'string') {  // data source is a string
      req.write(dataSource);
    } else {
      throw new Error('Invalid data source.');    // invalid data source
    }
  }

  // Set api key in http header
  req.setHeader('X-PachubeApiKey', masterApiKey);
  req.end();
};
