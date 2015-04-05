$(function(){
  var socket = io.connect(window.location.host);
  socket.on('new tweet', function (tweet) {
    $('.tweets').prepend('<div class="tweet" id="'+tweet.id+'"></div>');
    $('#'+tweet.id).append('<img class="profile-image" src="'+tweet.profile_image+'">')
                   .append('<h2>'+tweet.user+'</h2>')
                   .append('<p>'+tweet.text+'</p>');
  });
});