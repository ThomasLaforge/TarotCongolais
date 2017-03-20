import {Game} from './Game'

export class GameCollection {

    private _gameList: { [gameRoomId: string]: Game; };

	constructor(gameList:{ [gameRoomId: string]: Game; } = {}) {
        this.gameList = gameList;
    }

    getGame(gameRoomId:string){
        return this.gameList[gameRoomId];
    }

	public get gameList(): { [gameRoomId: string]: Game; } {
		return this._gameList;
	}

	public set gameList(value: { [gameRoomId: string]: Game; }) {
		this._gameList = value;
	}
    
}