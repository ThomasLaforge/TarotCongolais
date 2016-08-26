// Libs and tools
let http = require('http');
let fs   = require('fs');
let colors   = require('colors');
let nodeUtil   = require('util');
// Modules
import {Game} from '../modules/Game';
import {Player} from '../modules/Player';

// Server
let port = 8080;
let server = http.createServer(function(req, res) {
	fs.readFile('../../view/index.html', 'utf-8', function(error, content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);
    });
});

// reset console
process.stdout.write('\x1Bc'); 
console.log(colors.green('-------------- Server started on localhost: %s --------------'), port);

let io = require('socket.io').listen(server);
let clients:number = 0;

// let pCollTest = [new Player('Thomas'), new Player('Julie'), new Player('Kevin'), new Player('Willy') ];
// let g = new Game(pCollTest);

// g.soloPlay(g.players[0], g.players[0].hand.playFirstCard());
// g.soloPlay(g.players[1], g.players[0].hand.playFirstCard());
// g.soloPlay(g.players[2], g.players[0].hand.playFirstCard());
// g.soloPlay(g.players[3], g.players[0].hand.playFirstCard());
// console.log(nodeUtil.inspect(g, false, null));

// // Quand un client se connecte, on le note dans la console
// io.sockets.on('connection', function (socket:any) {
//     console.log('Un client est connecté !');
//     clients++;

//     if(clients == 4){
//         console.log('la partie est complète et va donc commencer');
//         socket.broadcast.emit('message', 'La partie va commencer!');
//         socket.emit('message', 'Bienvenue, vous êtes le dernier arrivé. La partie va commencer!'); 
//         io.sockets.emit('message', 'Hello tout le monde vous êtes au complet');

//     }
//     else if(clients > 4) {
//         socket.emit('message', 'Désolé il y a déjà assez de joueurs');
//     }
//     else{
//         socket.emit('message' ,'Bienvenue nous attendons d\'autres adversaires avant de débuter la partie');
//     }

// });
// usernames which are currently connected to the chat
var usernames = {};

io.sockets.on('connection', function (socket) {

	// when the client emits 'sendchat', this listens and executes
	socket.on('sendchat', function (data) {
		// we tell the client to execute 'updatechat' with 2 parameters
		io.sockets.emit('updatechat', socket.username, data);
	});

	// when the client emits 'adduser', this listens and executes
	socket.on('adduser', function(username){
		// we store the username in the socket session for this client
		socket.username = username;
		// add the client's username to the global list
		usernames[username] = username;
		// echo to client they've connected
		socket.emit('updatechat', 'SERVER', 'you have connected');
		// echo globally (all clients) that a person has connected
		socket.broadcast.emit('updatechat', 'SERVER', username + ' has connected');
		// update the list of users in chat, client-side
		io.sockets.emit('updateusers', usernames);
	});

	// when the user disconnects.. perform this
	socket.on('disconnect', function(){
		// remove the username from global usernames list
		delete usernames[socket.username];
		// update list of users in chat, client-side
		io.sockets.emit('updateusers', usernames);
		// echo globally that this client has left
		socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');
	});
});

server.listen(port);