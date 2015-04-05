var fs = require('fs');
var config = JSON.parse(fs.readFileSync('./config.json'));

var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

var Twit = require('twit');
var twitter = new Twit({
  consumer_key: config.twitter.consumer_key,
  consumer_secret: config.twitter.consumer_secret,
  access_token: config.twitter.access_token,
  access_token_secret: config.twitter.access_token_secret
});

app.get('/', function(request, response) {
  response.send('Hello world!');
});

server.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});
