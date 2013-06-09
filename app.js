var url = require('url');
var uuid = require('node-uuid');
var express = require('express');
var hulk = require('hulk-hogan');
var app = express();

app.set('views', __dirname + '/views')

// use hulk / hogan.js for views
app.set('view engine', 'html');
app.engine('html', require('hulk-hogan').__express)
app.engine('ejs', require('ejs').renderFile);


app.get('/', function(req, res){

	var script_url = url.format({
		host:req.headers.host, 
		pathname:'v0/jquery.1.10.1.instrument.js',
		protocol:'http'
	});
	
	res.render('index', {script_url:script_url})
});


app.get('/v0/jquery.1.10.1.instrument.js', function(req,res){

	res.setHeader('Content-Type', 'application/javascript');

	var transport_iframe = url.format({
		host:req.headers.host, 
		pathname:'transport.html',
		protocol:'http'
	});

	res.render('instrument_jquery.ejs', {transport_iframe:transport_iframe})
});




/*

app.get('/t1234', function(req, res){
	var script_url = 'http://' + req.headers.host + '/shaker.js?' + req.url.slice(1);
	res.render('shake.jade',{script_url:script_url});
})

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
*/

app.use(express.static(__dirname + '/public'));

var port = process.env.PORT || 8080;
app.listen(port);

console.log("Listening on " + port);
