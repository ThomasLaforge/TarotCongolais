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

// init
const MAX_PLAYER:number = 4;
let playerColl = new PlayerCollection();
let game:Game;

console.log('ok boy')

io.sockets.on('connection', function (socket:SocketIO.Socket) {
    
    // when the client emits 'sendchat', this listens and executes
    // io.to( "/#" + socket_id).emit("event_name",{data:true})
	socket.on('sendchat', function (data:any) {
		// we tell the client to execute 'updatechat' with 2 parameters
		io.sockets.emit('updatechat', socket.id, data);
	});

	// when the client emits 'adduser', this listens and executes
	socket.on('adduser', function(username:string){
        if(playerColl.getNbPlayer() < MAX_PLAYER){
            let p = new Player(username, socket.id);
            playerColl.addPlayer(p);
            console.log(nodeUtil.inspect(playerColl, false, null));

            if(playerColl.getNbPlayer() == MAX_PLAYER){
                io.sockets.emit('startgame', game);
                game = new Game(playerColl);
                playerColl.getPlayers().forEach( (p:Player) => {
                    let left = playerColl.getLeftPlayer(p).hand.length();
                    let right = playerColl.getRightPlayer(p).hand.length();
                    let face = playerColl.getFacePlayer(p).hand.length();
                    let hand = p.hand.arrCard;
                    let hands = {
                        left : left,
                        face : face,
                        right : right,
                        hand : hand,
                    };
                    console.log(nodeUtil.inspect(hands, false, null));
                    
                    io.to(p.socketId).emit('updatehands', hands);
                });
            }
        }
        else{
            console.log('new player connected but no more slots');
            socket.emit('logconnection', 'Sorry game is full');
        }
        
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