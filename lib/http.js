var fs   = require('fs'),
    http = require('http');

exports.request = function(apiKey, options, callback, dataFormat, dataFile) {
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

  if (dataFile) {
    req.write(fs.readFileSync(dataFile));
  }

  // Set api key in http header
  req.setHeader('X-PachubeApiKey', apiKey);
  req.end();
};
