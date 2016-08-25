// Libs and tools
let http = require('http');
let fs   = require('fs');
let colors   = require('colors');
// Modules
import {Game} from '../modules/Game';

// Server
let port = 8080;
let server = http.createServer(function(req, res) {
	fs.readFile('./index.html', 'utf-8', function(error, content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);
    });
});

console.log(colors.green('-------------- Server started on localhost: %s --------------'), port);

let io = require('socket.io').listen(server);
let clients:number = 0;

// Quand un client se connecte, on le note dans la console
io.sockets.on('connection', function (socket:any) {
    console.log('Un client est connecté !');
    clients++;

    if(clients == 4){
        console.log('la partie est complète et va donc commencer');
        socket.broadcast.emit('message', 'La partie va commencer!');
        socket.emit('message', 'Bienvenue, vous êtes le dernier arrivé. La partie va commencer!'); 
        io.sockets.emit('message', 'Hello tout le monde vous êtes au complet');

    }
    else if(clients > 4) {
        socket.emit('message', 'Désolé il y a déjà assez de joueurs');
    }
    else{
        socket.emit('message' ,'Bienvenue nous attendons d\'autres adversaires avant de débuter la partie');
    }

});

server.listen(port);

//////////////////////////////////////////////////////////////////////////////////
///                                  Objets                                    ///
//////////////////////////////////////////////////////////////////////////////////
// let nbPlayers = 4;		//nombre de joueurs : 3 ou 4.
// let deck = [];

// function getDeck(nbPlayers, turn){
//     let nbCards = nbPlayers * nbCardsByPlayer(nbPlayers, turn);
//     let tabAllCards = getAllCards();
//     deck = tabAllCards;
//     deck.shuffle();
//     //on garde x cartes
//     deck.slice(-nbCards);
// }

// function nbCardsByPlayer(nbPlayers, turn){
//     return turn * getNbTurn;
// }

// function getNbTurn(nbPlayers){
//     return Math.floor(getAllCards().length/nbPlayers);
// }

// /*return a tab with all possible cards */

// function getAllCards(){
//     let tab = [];
//     for (let i = 0; i < nbCards; i++) {
//         tab.push(i);
//     };
//     return tab;
// }