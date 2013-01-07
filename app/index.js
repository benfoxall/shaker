var uuid = require('node-uuid');
var PUBNUB = require('pubnub');
var express = require('express');
var app = express();

var pubnub = PUBNUB.init({
	publish_key : 'pub-c0f29142-e5b3-4ae5-a772-38ccb57f0a7f',
	subscribe_key : 'sub-c172f475-b21b-11e1-832b-bd42eaf713d5'
});

// the channel page
app.get('/:channel/', function(req,res){
	res.sendfile(__dirname + '/public/channel.html');
});

app.get('/:channel/push.png', function(req,res){
	console.log(req.params.channel);
	var channel = req.params.channel;

	res.sendfile(__dirname + '/public/push.png');

	console.log(req.query);

	var m = JSON.stringify(req.query.d);

    // SEND
    pubnub.publish({
        channel : channel,
        message : req.query.d
    })

});

// "get started"
app.post('/', function(req,res){
	res.redirect('/' + uuid.v4() + '/');
});

app.use(express.static(__dirname + '/public'));

app.listen(process.env.PORT || 3000);