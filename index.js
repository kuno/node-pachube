var fs             = require('fs'),
    path           = require('path');

var User           = require('./lib/user.js'),
    Feed           = require('./lib/feed.js'),
    Point          = require('./lib/point.js'),
    Stream         = require('./lib/stream.js'),
    Trigger        = require('./lib/trigger.js');

exports.User       = User;
exports.Feed       = Feed;
exports.Point      = Point;
exports.Stream     = Stream;
exports.Trigger    = Trigger;

exports.version    = JSON.parse(fs.readFileSync(path.join(__dirname, './package.json'))).version;
exports.apiVersion = require('./include/meta.js').apiVersion;
