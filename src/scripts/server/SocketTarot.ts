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
    
	public get socketIO(): SocketIO.Server {
		return this._socketIO;
	}

	public set socketIO(value: SocketIO.Server) {
		this._socketIO = value;
	}

}