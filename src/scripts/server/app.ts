// Libs and tools
import * as http        from 'http';
import * as fs          from 'fs';
import * as nodeUtil    from 'util';
import * as SocketIO    from 'socket.io'
let colors = require('colors');

// Modules
import {Game} from '../modules/Game';
import {Player} from '../modules/Player';
import {port} from '../modules/Config';
import {Bet}    from '../modules/Bet';
import {PlayerCollection} from '../modules/PlayerCollection';
import {GameCollection} from '../modules/GameCollection';

// Server
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
let GC = new GameCollection();
let startRoomCounterValue = 1;
let roomCounter = startRoomCounterValue - 1;

io.sockets.on('connection', function (socket: SocketTarotInterface) {
    // Init extended socket
    let socketTarot = new SocketTarot(socket);
    
    /**
    * Socket States
    */
    socket.on('reconnection', function(){
        console.log('reconnection', socket.player.username);
    });

	// when the user disconnects.. perform this
	socket.on('disconnect', function(){
        if(socket.player){
            console.log('player disconnect', socket.player.username)
            // retirer le joueur de la collection
        }     
	});
    
    /** 
    * Connections
    */
    
    // Connect on site
    socket.on('register', (pseudo: string) => {
        // if player already exist and he is different of current socket pseudo 
        if( socketIOTarot.getAllPseudo().indexOf(pseudo) !== -1 ){
            console.log('pseudo already used', pseudo)
            socket.emit('pseudo_already_used')
        }
        else{
            socket.join('lobby');
            let newPlayer = new Player(pseudo);
            socket.player = newPlayer;
            console.log('new player connected', pseudo);
            socket.emit('player_added');
        }
    })

    /**
    * Infos
    */

    // Pseudos
    socket.on('get_player_list', () => {
        socket.emit('getAllPlayer', socketIOTarot.getAllPseudo());
    })
    
    // Player is connected on site
    socket.on('isLoggedIn', () => {
        let isLoggedIn = socket.player ? true : false;
        socket.emit('isLoggedIn', isLoggedIn);
    })

    // get game colleciton
    socket.on('get_game_collection', () => {
        socket.emit('getGameCollection', GC);
    })

    /**
    * Chat
    */

	socket.on('new_game_message', function (msg: string) {
		io.to(socket.gameRoomId).emit('updatechat', { pseudo : socket.player.username, msg: msg});  
	});

    socket.on('new_lobby_message', function (msg: string) {
		io.to('lobby').emit('updatechat', { pseudo : socket.player.username, msg: msg});  
	});

    /**
    * Lobby
    */

	socket.on('update_lobby_list', function (msg: string) {
        io.emit('update_lobby_list', GC.getLobbyList());
    });

        // connect on game room by matchmaking
    socket.on('lobby-auto', () => {
        // get game room id by auto matchmaking
        let gameRoomId = GC.getRandomAndNotFullGameRoomId();
        console.log('getRandomAndNotFullGameRoomId : ' + gameRoomId)
        if(!gameRoomId) {
            gameRoomId = "game-" + roomCounter;
            // Check collision on room counter
            while(!GC.getGame(gameRoomId)){
                roomCounter++; gameRoomId = "game-" + roomCounter;
                GC.addNewGame(gameRoomId);
            }
        }

        console.log('lobby-auto : ' + gameRoomId + ', ' + socket.player.username)

        let game = GC.getGame(gameRoomId);
        game.addPlayer(socket.player);
        
        socket.gameRoomId = gameRoomId;
        socket.join( gameRoomId );

        socket.emit('enter_gameroom', gameRoomId);
        socket.broadcast.to(gameRoomId).emit('gameroom_new_player', socket.player);
        io.emit('update_lobby_list', GC.getLobbyList());
    })

    // connect on game room selecting a game
    socket.on('lobby-join', (gameRoomId: string) => {
        console.log('lobby-join : ' + gameRoomId + ', ' + socket.player.username)
        let game = GC.getGame(gameRoomId) 
        if( game ) {
            if( game.isNotFull() ){
                game.addPlayer(socket.player);
                
                socket.gameRoomId = gameRoomId
                socket.join( gameRoomId );
                
                socket.emit('enter_gameroom', gameRoomId)
                socket.broadcast.to(gameRoomId).emit('gameroom_new_player', socket.player)            
                io.emit('update_lobby_list', GC.getLobbyList());             
            }
            else{
                socket.emit('game_is_already_full', gameRoomId)
            }
        }
        else{
            socket.emit('try_to_join_undefined_gameroom', gameRoomId)
        }
        
    })

    // connect on game room creating a game
    socket.on('lobby-create', () => {
        roomCounter++;
        let gameRoomId = 'game-' + roomCounter;
        console.log('lobby-create : ' + gameRoomId + ', ' + socket.player.username)
        
        GC.addNewGame(gameRoomId);
        GC.getGame(gameRoomId).addPlayer(socket.player);
        
        socket.gameRoomId = gameRoomId;
        socket.join( gameRoomId );

        socket.emit('enter_gameroom', gameRoomId)
        socket.broadcast.emit('lobby_update-list');
        io.emit('update_lobby_list', GC.getLobbyList());     
    })

    /**
    * Game states
    */

    socket.on('player_is_ready', (data:any) => {
        console.log('player_is_ready', data)
        let game = GC.getGame(socket.gameRoomId)
        if(game){
            game.addReadyPlayer(socket.player);
            if(game.areAllPlayersReady()){
                
            }
            else{

            }
        }
    })

    socket.on('player_bet', (playerBet: number) => {
        console.log('player_bet', playerBet)
        let g = GC.getGame(socket.gameRoomId);
        if(g){
            g.addBet( new Bet(socket.player, playerBet) )
        }
    })

    socket.on('player_not_betting', (data:any) => {
        console.log('player_not_betting', data)
    })

    socket.on('player_hover_card', (data:any) => {
        console.log('player_hover_card', data)
    })

    socket.on('player_play', (data:any) => {
        console.log('player_play', data)
    })

    socket.on('player_not_playing', (data:any) => {
        console.log('player_not_playing', data)
    })


});

server.listen(port);