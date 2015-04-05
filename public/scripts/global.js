$(function(){

  var paused = false;

  //bring in tweets
  var socket = io.connect(window.location.host);
  socket.on('new tweet', function (tweet) {
  	if (paused == false)
  	{
  	  $('.tweets').prepend('<div class="tweet" id="'+tweet.id+'"></div>');
      $('#'+tweet.id).append('<img class="profile-image" src="'+tweet.profile_image+'">')
                     .append('<h2>'+tweet.user+'</h2>')
                     .append('<p>'+tweet.text+'</p>');
  	}
  });

  //pause button handling
  $('a[rel=pause]').on('click', function(){
  	if (paused == false)
  	{
  	  paused = true;
      $(this).html('<i class="fa fa-play"></i>');
  	}
  	else
  	{
      paused = false;
      $(this).html('<i class="fa fa-pause"></i>')
  	}
  	
  });
});

//google analytics stuff
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-36670106-4', 'auto');
ga('send', 'pageview');