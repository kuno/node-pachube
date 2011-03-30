var Feed           = require('./lib/feed.js'),
    Trigger        = require('./lib/trigger.js'),
    DataPoint      = require('./lib/dataPoint.js'),
    DataStream     = require('./lib/dataStream.js');

exports.Feed       = Feed;
exports.Trigger    = Trigger;
exports.DataPoint  = DataPoint;
exports.dataStream = DataStream;

exports.version    = JSON.parse('./package.json').version;
