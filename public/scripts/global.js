$(function(){
  var socket = io.connect(window.location.host);
  socket.on('news', function (data) {
    console.log(data);
    socket.emit('my other event', { my: 'data' });
  });
});