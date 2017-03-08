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

import {SocketIOTarot, SocketTarot, SocketTarotInterface} from './SocketTarot'
let io:SocketIO.Server = require('socket.io').listen(server);
let socketIOTarot = new SocketIOTarot(io); 

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

interface PlayerInfo {
    // hand : Hand
    pv : number
    bet : number
}

interface GameData {
    me: PlayerInfo
    left: PlayerInfo
    top: PlayerInfo
    right: PlayerInfo
}

// init
let current_pc = new PlayerCollection();
let room_counter = 0;

io.sockets.on('connection', function (socket: SocketTarotInterface) {
    let socketTarot = new SocketTarot(socket);

    socket.on('register', (pseudo: string) => {
        // if player already exist and he is different of current socket pseudo 
        if( socketIOTarot.getAllPseudo().indexOf(pseudo) !== -1 ){
            console.log('pseudo already used', pseudo)
            socket.emit('pseudo_already_used')
        }
        else{
            socket.join('lobby');
            let newPlayer = new Player(pseudo);
            socket.player = newPlayer
            console.log('new player connected', pseudo)
            socket.emit('player_added')
        }
    })

    socket.on('connect-to-game', (pseudo: string) => {
        // Pseudo not free 
        if(current_pc.getNames().indexOf(pseudo) !== -1){
            console.log('pseudo_not_free', pseudo)
            socket.emit('pseudo_not_free')
        }
        // Pseudo empty (must be checked on client too)
        else if(pseudo === ''){
            console.log('trying to add player with empty username')
            socket.emit('try_add_player_with_empty_username')
        }
        else if(socket.player){
            console.log('player try to change is pseudo. Not possible')
            // let oldPseudo = socket.player.username
            socket.emit('player_cant_change_pseudo')
        }
        else{
            // Connect on room
            let gameRoom = 'game-' + room_counter;
            socket.gameRoom = gameRoom;
            socket.join( gameRoom );

            let newPlayer = new Player(pseudo);
            socket.player = newPlayer
            current_pc.addPlayer(newPlayer)

            // Auto connection on board of room
            console.log('new player on board', socket.player.username)
            socket.to(gameRoom).emit('pseudo_accepted');
            io.in(gameRoom).emit('new_player', socket.player.username)        
            
            if(current_pc.isFull()){
                console.log('new player complete the game. Game will start')
                room_counter++;
                let newGame = new Game(current_pc);
                current_pc = new PlayerCollection();
                let gameData = {};
                io.emit('start_game', gameData)
            }
        }

    })

    socket.on('log-pseudo-list', () => {
        console.log('------------------------')
        console.log('pseudo list :');
        socketIOTarot.getAllPseudo().forEach( (p: string) => {
            console.log(p);
        })  
        console.log('------------------------')
    })
    
    socket.on('is_on_game', () => {
        let isOnGame = socket.player ? true : false;
        socket.emit('is_on_game', isOnGame);
    })

	socket.on('new_game_message', function (msg: string) {
		io.to(socket.gameRoom).emit('updatechat', { pseudo : socket.player.username, msg: msg});  
	});

    socket.on('new_lobby_message', function (msg: string) {
		io.to('lobby').emit('updatechat', { pseudo : socket.player.username, msg: msg});  
	});

    socket.on('reconnection', function(){
        console.log('reconnection', socket.player.username);
    });

	// when the user disconnects.. perform this
	socket.on('disconnect', function(){
        // retirer le joueur de la collection
        if(socket.player){
            console.log('player disconnect', socket.player)
            current_pc.remove(socket.player)
        }
		// let pDisconnected = pc.getPlayerBySocketId(socket.id);
        // pc.remove(pDisconnected);
        // console.log(nodeUtil.inspect(pDisconnected, false, null));        
	});
});

server.listen(port);

export {port}