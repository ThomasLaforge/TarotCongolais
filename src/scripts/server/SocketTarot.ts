import * as SocketIO from 'socket.io'
import { Player } from '../modules/Player'

export interface SocketTarotInterface extends SocketIO.Socket {
    player: Player,
    gameRoom: string
}

export class SocketTarot {

    private _socket : SocketTarotInterface;

	constructor(socket: SocketTarotInterface) {
        this.socket = socket;
    }

	showSocketId(){
		console.log('socket id :' + this.socket.id)
	}

	public get socket(): SocketTarotInterface {
		return this._socket;
	}
	public set socket(value: SocketTarotInterface) {
		this._socket = value;
	}

}

export class SocketIOTarot {

    private _socketIO: SocketIO.Server;

	constructor(socketIO: SocketIO.Server) {
        this.socketIO = socketIO
    }

	getAllSocketId(){
		return Object.keys(this.socketIO.sockets.connected)
	}

	getAllSockets(){
		return Object.keys(this.socketIO.sockets.connected).map( socketid => {
			return this.socketIO.sockets.connected[socketid]
		})
	}

	getAllPseudo(){
		return this.getAllSockets().filter( socket => {
			return socket.player;
		}).map( socket => {
			return socket.player.username;
		})
	}
    
	public get socketIO(): SocketIO.Server {
		return this._socketIO;
	}

	public set socketIO(value: SocketIO.Server) {
		this._socketIO = value;
	}

}