var fs             = require('fs'),
    path           = require('path');

exports.User       = require('./lib/user.js');
exports.Feed       = require('./lib/feed.js');
exports.Point      = require('./lib/point.js');
exports.Stream     = require('./lib/stream.js');
exports.Trigger    = require('./lib/trigger.js');

exports.version    = JSON.parse(fs.readFileSync(path.join(__dirname, './package.json'))).version;
exports.apiVersion = require('./include/meta.js').apiVersion;
