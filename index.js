var fs             = require('fs'),
    path           = require('path');

var Feed           = require('./lib/feed.js'),
    Point          = require('./lib/point.js'),
    Stream         = require('./lib/stream.js');

exports.Feed       = Feed;
exports.Point      = Point;
exports.Stream     = Stream;

exports.version    = JSON.parse(fs.readFileSync(path.join(__dirname, './package.json'))).version;
