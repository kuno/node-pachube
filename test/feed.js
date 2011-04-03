var MASTERAPIKEY = 'WANKT8pJLP-2xFrw5EqvQZBJg_Gi24hTyim9uY0GRUk';
var Feed = require('../lib/feed.js'),
    feed = new Feed(MASTERAPIKEY);

var parameters = [{key:"lat",value:51.52},{key:"lon",value:0.13},{key:"distance",value:100.0},{key:"q",value:'energy'}];

feed.list(parameters, function(data) {
    var result = JSON.parse(data);
    console.log(result);
});
