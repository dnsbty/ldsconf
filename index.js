//create and configure the express app and server
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

//load environment variables
var env = require('node-env-file');
env(__dirname + '/.env');

//
app.set('port', (process.env.PORT || 5000));
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));

//set up the twitter instance
var Twit = require('twit');
var twitter = new Twit({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_SECRET
});

//start twitter stream
var stream = twitter.stream('statuses/filter', { track: '#ldsconf', language: 'en' });
stream.on('tweet', function (tweet) {
  io.emit('new tweet', {
    id: tweet.id,
    user: tweet.user.screen_name,
    text: tweet.text,
    profile_image: tweet.user.profile_image_url_https
  });
});

//homepage
app.get('/', function(request, response) {
  response.render('index');
});

// io.on('connection', function (socket) {
//   socket.emit('news', { hello: 'world' });
//   socket.on('my other event', function (data) {
//     console.log(data);
//   });
// });

//start the server listening for requests
server.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});
