import {Player} from './Player';
import * as Utils from './utils';
import * as  _ from 'lodash';

export class PlayerCollection {

    private _arrPlayers:Array<Player>;
    private _arrReadyPlayers:Array<Player>;
    private _indexFirstPlayer:number;
    private _maxNbPlayer:number;

	constructor(maxNbPlayer = 4, arrPlayers: Array<Player> = [], indexFirstPlayer = 0, arrReadyPlayers: Array<Player> = []) {
        this.indexFirstPlayer = indexFirstPlayer;
        this.arrPlayers = arrPlayers;
        this.maxNbPlayer = maxNbPlayer;
        this.arrReadyPlayers = arrReadyPlayers;
	}

    addPlayer(p: Player){
        if( this.playerIsOnCollection(p) ) {
            this.arrPlayers.push(p);
        }
    }

    addReadyPlayer(p: Player){
        if( this.isPlayerReady(p) && this.playerIsOnCollection(p) ) {
            this.arrReadyPlayers.push(p);
        }
    }

    shuffle(){
        Utils.shuffle(this.arrPlayers);
    }

    getPlayers():Array<Player> {
        return this.arrPlayers;
    }

    getNames():Array<string> {
        let res:Array<string> = [];

        this.arrPlayers.forEach( p => {
            res.push(p.username);
        });

        return res;
    }

    getFirstPlayer() {
        return this.arrPlayers[ this.indexFirstPlayer ];
    }

    changeFirstPlayer() {
        this.indexFirstPlayer = (this.indexFirstPlayer + 1) % this.getNbPlayer(); 
    }

    getNbPlayer() {
        return this.arrPlayers.length;
    }

    remove(p: Player) {
        let idPlayer = this.getPlayerIndex(p);
        this.arrPlayers.splice(idPlayer,1);
    }

    getLeftPlayer(player: Player) : Player {
        let playerId:number = this.getPlayerIndex(player);
        if(playerId == -1){
            throw new Error('player not in collection');
        }
        let leftPlayerId:number = Math.abs( playerId - 1 + this.getNbPlayer() ) % this.getNbPlayer();
        return this.arrPlayers[ leftPlayerId ];
    }

    getFacePlayer(player: Player) {
        let playerId:number = this.getPlayerIndex(player);
        if(playerId == -1){
            throw new Error('player not in collection');
        }
        //Todo : If nb player = 4
        let leftPlayerId:number = Math.abs( playerId - 2 + this.getNbPlayer() ) % this.getNbPlayer();
        return this.arrPlayers[ leftPlayerId ];
    }

    getRightPlayer(player: Player) : Player {
        let playerId:number = this.getPlayerIndex(player);
        if(playerId == -1){
            throw new Error('player not in collection');
        }
        let rightPlayerId:number = (playerId + 1) % 4;
        return this.arrPlayers[ rightPlayerId ];
    }

    getPlayerIndex(player: Player): number {
        let res: number = -1;

        this.arrPlayers.forEach( (p, index) => {
            if( _.isEqual(p, player)){
                res = index;
            }
        });

        return res;
    }

    isFull(): boolean {
        return this.arrPlayers.length >= this.maxNbPlayer
    }

    areAllPlayersReady(): boolean {
        return this.arrReadyPlayers.length >= this.maxNbPlayer
    }

    playerIsOnCollection(p: Player) {
        return this.arrPlayers.indexOf(p) !== -1
    }
    
    isPlayerReady(p: Player) {
        return this.arrReadyPlayers.indexOf(p) !== -1
    }

    /**
    * Getters / Setters
    */
	public get arrPlayers(): Array<Player> {
		return this._arrPlayers;
	}
	public set arrPlayers(value: Array<Player>) {
		this._arrPlayers = value;
	}
	public get indexFirstPlayer(): number {
		return this._indexFirstPlayer;
	}
	public set indexFirstPlayer(value: number) {
		this._indexFirstPlayer = value;
	}
	public get maxNbPlayer(): number {
		return this._maxNbPlayer;
	}
	public set maxNbPlayer(value: number) {
		this._maxNbPlayer = value;
	}
	public get arrReadyPlayers(): Array<Player> {
		return this._arrReadyPlayers;
	}
	public set arrReadyPlayers(value: Array<Player>) {
		this._arrReadyPlayers = value;
	}    
    
}