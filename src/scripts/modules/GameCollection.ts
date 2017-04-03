import {Game} from './Game'
import {LobbyListElt} from './TarotCongolais'
import * as _ from 'lodash'

export class GameCollection {

    private _gameList: { [gameRoomId: string]: Game; };

	constructor(gameList:{ [gameRoomId: string]: Game; } = {}) {
        this.gameList = gameList;
    }

	addNewGame(gameRoomId: string){
		this.addGame(gameRoomId, new Game())
	}

	addGame(gameRoomId: string, game: Game){
		if( !this.gameList[gameRoomId] ){
			this.gameList[gameRoomId] = game;
		}
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

	getLobbyList( withFullGames: boolean = true, withPrivateGames: boolean = true ): Array<LobbyListElt>{
		let lobbyList: Array<LobbyListElt> = [];

		for(var gameRoomId in this.gameList) {
			let game = this.gameList[gameRoomId];

			if( ( withFullGames || game.isNotFull() ) && withPrivateGames ){
				lobbyList.push({
					name: gameRoomId,
					maxPlayers: game.getNbMaxPlayer(),
					playerOn: game.getNbPlayer()
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