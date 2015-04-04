var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var twitter = require('twit');

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
  response.send('Hello World!');
});

server.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});
