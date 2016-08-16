$(function () {
    /* client side*/
    console.log('test gulp watch/serve');
    var socket = io.connect('http://localhost:8080');
    socket.on('message', function (msg) {
        console.log('new message  : ' + msg);
    });
});
