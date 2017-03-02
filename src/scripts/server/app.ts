// Libs and tools
import * as http        from 'http';
import * as fs          from 'fs';
import * as nodeUtil    from 'util';
import * as SocketIO    from 'socket.io'
let colors = require('colors');

// Modules
import {Game} from '../modules/Game';
import {Player} from '../modules/Player';
import {PlayerCollection} from '../modules/PlayerCollection';

// Server
let port = 8080;
let server = http.createServer(function(req, res) {
	fs.readFile('../../view/index.html', 'utf-8', function(error, content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);
    });

});
let io = require('socket.io').listen(server);

// reset console
process.stdout.write('\x1Bc'); 
console.log(colors.green('-------------- Server started on localhost: %s --------------'), port);


/**
 * Different msg send method
    // sending to sender-client only
    socket.emit('message', "this is a test");

    // sending to all clients, include sender
    io.emit('message', "this is a test");

    // sending to all clients except sender
    socket.broadcast.emit('message', "this is a test");

    // sending to all clients in 'game' room(channel) except sender
    socket.broadcast.to('game').emit('message', 'nice game');

    // sending to all clients in 'game' room(channel), include sender
    io.in('game').emit('message', 'cool game');

    // sending to sender client, only if they are in 'game' room(channel)
    socket.to('game').emit('message', 'enjoy the game');

    // sending to all clients in namespace 'myNamespace', include sender
    io.of('myNamespace').emit('message', 'gg');

    // sending to individual socketid
    socket.broadcast.to(socketid).emit('message', 'for your eyes only');
 */

interface SocketTarot extends SocketIO.Socket {
    player: Player
}

// init
const MAX_PLAYER:number = 4;
let playerColl = new PlayerCollection();
let game:Game;

io.sockets.on('connection', function (socket: SocketTarot) {
    socket.on('set_pseudo', (pseudo: string) => {
        let newPlayer = new Player(pseudo);
        socket.player = newPlayer
        // game.players.addPlayer(new Player(pseudo))
        socket.emit('pseudo_accepted');
        console.log('new pseudo', socket.player.username)
    });

    socket.on('new_player_on_board', () => {
        io.emit('new_player', socket.player.username)
    })
    
    // when the client emits 'sendchat', this listens and executes
    // io.to( "/#" + socket_id).emit("event_name",{data:true})
	socket.on('new_message', function (msg: string) {
        console.log('get new message', msg)
		// we tell the client to execute 'updatechat' with 2 parameters
		io.emit('updatechat', { pseudo : socket.player.username, msg: msg});  
	});

    socket.on('getinfogame', function(){
        console.log('ask info game');
        socket.emit('test', 'hello, ask info game is received')
    });

    socket.on('reconnection', function(){
        console.log('reconnection');
    });

	// when the user disconnects.. perform this
	socket.on('disconnect', function(){
        // retirer le joueur de la collection
		let pDisconnected = playerColl.getPlayerBySocketId(socket.id);
        playerColl.remove(pDisconnected);
        console.log(nodeUtil.inspect(pDisconnected, false, null));        
	});
});

server.listen(port);