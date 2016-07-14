var http = require('http');
var fs   = require('fs');

var server = http.createServer(function(req, res) {
	fs.readFile('./index.html', 'utf-8', function(error, content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);
    });
});

console.log('-------------- Server started --------------')

var io = require('socket.io').listen(server);
var clients = [];

// Quand un client se connecte, on le note dans la console
io.sockets.on('connection', function (socket) {
    console.log('Un client est connecté !');
});


server.listen(8080);

//////////////////////////////////////////////////////////////////////////////////
///                                  Objets                                    ///
//////////////////////////////////////////////////////////////////////////////////
var nbPlayers = 4;		//nombre de joueurs : 3 ou 4.
var deck = [];

function getDeck(nbPlayers, turn){
    var nbCards = nbPlayers * nbCardsByPlayer(nbPlayers, turn);
    var tabAllCards = getAllCards();
    deck = tabAllCards;
    deck.shuffle();
    //on garde x cartes
    deck.slice(-nbCards);
}

function nbCardsByPlayer(nbPlayers, turn){
    return turn * getNbTurn;
}

function getNbTurn(nbPlayers){
    return Math.floor(getAllCards().length/nbPlayers);
}

/*return a tab with all possible cards */

function getAllCards(){
    var tab = [];
    for (var i = 0; i < nbCards; i++) {
        tab.push(i);
    };
    return tab;
}