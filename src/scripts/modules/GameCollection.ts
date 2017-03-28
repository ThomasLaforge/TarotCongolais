import {Game} from './Game'
import {LobbyList} from './TarotCongolais'
import * as _ from 'lodash'

export class GameCollection {

    private _gameList: { [gameRoomId: string]: Game; };

	constructor(gameList:{ [gameRoomId: string]: Game; } = {}) {
        this.gameList = gameList;
    }

    getGame(gameRoomId:string){
        return this.gameList[gameRoomId];
    }

	getRandomAndNotFullGameRoomId(){
		let gameRoomId: string;
		
		return _.sample(Object.keys(this.gameList).filter( (key: string) => {
			return this.gameList[key].isNotFull();
		}));

	}

	getLobbyList( withFullGames: boolean = true, withPrivateGames: boolean = true ): Array<LobbyList>{
		let lobbyList: Array<LobbyList> = [];

		for(var gameRoomId in this.gameList) {
			let game = this.gameList[gameRoomId];

			if( ( withFullGames || game.isNotFull() ) && withPrivateGames ){
				lobbyList.push({
					gameRoomId: gameRoomId,
					nbMaxPlayer: game.getNbMaxPlayer(),
					nbPlayer: game.getNbPlayer()
				})
			}
		}

		return lobbyList;
	}

	public get gameList(): { [gameRoomId: string]: Game; } {
		return this._gameList;
	}

	public set gameList(value: { [gameRoomId: string]: Game; }) {
		this._gameList = value;
	}
    
}