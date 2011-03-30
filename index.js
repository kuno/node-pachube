var fs             = require('fs'),
    path           = require('path');

var Feed           = require('./lib/feed.js'),
    Trigger        = require('./lib/trigger.js'),
    DataPoint      = require('./lib/dataPoint.js'),
    DataStream     = require('./lib/dataStream.js');

exports.Feed       = Feed;
exports.Trigger    = Trigger;
exports.DataPoint  = DataPoint;
exports.dataStream = DataStream;

exports.version    = JSON.parse(fs.readFileSync(path.join(__dir, './package.json'))).version;
