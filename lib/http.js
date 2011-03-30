var fs   = require('fs'),
    http = require('http');

exports.request = function(key, options, callback, dataFormat, dataFile) {
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
  }
  if (dataFile) {
    req.write(fs.readFileSync(dataFile));
  }
  req.setHeader('X-PachubeApiKey', key);
  req.end();
};
