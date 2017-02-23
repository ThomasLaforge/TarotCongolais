import VueSocketio from 'vue-socket.io';
Vue.use(VueSocketio, 'http://localhost:8080');

let app = new Vue({
    el: '#app',
	sockets:{
		connect: function(){
			console.log('socket connected', 'Thomas')
			this.$socket.emit('adduser', 'Thomas')
    	}
	}
});
// let socket = io.connect('http://localhost:8080', {
// // var socket = io.connect('192.168.0.17:8080', {
// 	'reconnection': true,
// 	'reconnectionDelay': 500,
// 	'reconnectionAttempts': 10
// });

// // on connection to server, ask for user's name with an anonymous callback
// socket.on('connect', function(){
// 	// call the server-side function 'adduser' and send one parameter (value of prompt)
// 	socket.emit('adduser', prompt("Oh na na What's your name?"));
// });

// // listener, whenever the server emits 'updatechat', this updates the chat body
// socket.on('updatechat', function (username: string, data:{}) {
// 	$('#conversation').append('<b>'+username + ':</b> ' + data + '<br>');
// });

// socket.on('updatehands', function(hands){
// 	console.log(hands);
// 	// Clear all hands
// 	$('.card-in-cards-zone').remove();

// 	// Add Cards
// 	drawFriendCards(hands.right, 4);
// 	drawFriendCards(hands.face, 3);
// 	drawFriendCards(hands.left, 2);

// 	// Add my Cards
// 	drawMyCards(hands.hand);

// });

// // listener, whenever the server emits 'updatechat', this updates the chat body
// socket.on('logconnection', function (msg:any) {
// 	console.log(msg);
// });

// // on load of page
// $(function(){
// 	// when the client clicks SEND
// 	$('#datasend').click( function() {
// 		var message = $('#data').val();
// 		$('#data').val('');
// 		// tell server to execute 'sendchat' and send along one parameter
// 		socket.emit('sendchat', message);
// 	});

// 	$('#getInfo').click(function(){
// 		socket.emit('getinfogame',null);
// 	});

// });

// function drawFriendCards(nbCards:number, zone:number){
// 	for (var i=0; i<nbCards; i++){
// 		$('.cards-zone-' + zone).append('<div class="card-in-cards-zone"></div>');
// 	};
// }

// function drawMyCards(cards){
// 	for (var i=0; i<cards.length; i++){
// 		$('.cards-zone-1').append('<div class="card-in-cards-zone"></div>');
// 	};
// }
