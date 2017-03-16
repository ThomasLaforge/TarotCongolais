import {Player} from './Player';
import * as Utils from './utils';
import * as  _ from 'lodash';

export class PlayerCollection {

    private _arrPlayers:Array<Player>;
    private _indexFirstPlayer:number;
    private _maxNbPlayer:number;

	constructor(maxNbPlayer = 4, arrPlayers: Array<Player> = [], indexFirstPlayer = 0) {
        this.indexFirstPlayer = indexFirstPlayer;
        this.arrPlayers = arrPlayers;
        this.maxNbPlayer = maxNbPlayer;
	}

    addPlayer(p:Player){
        this.arrPlayers.push(p);
    }

    shuffle(){
        Utils.shuffle(this.arrPlayers);
    }

    getPlayers():Array<Player>{
        return this.arrPlayers;
    }

    getNames():Array<string>{
        let res:Array<string> = [];

        this.arrPlayers.forEach( p => {
            res.push(p.username);
        });

        return res;
    }

    getFirstPlayer(){
        return this.arrPlayers[ this.indexFirstPlayer ];
    }

    changeFirstPlayer(){
        this.indexFirstPlayer = (this.indexFirstPlayer + 1) % this.getNbPlayer(); 
    }

    getNbPlayer(){
        return this.arrPlayers.length;
    }

    remove(p:Player){
        let idPlayer = this.getPlayerId(p);
        this.arrPlayers.splice(idPlayer,1);
    }

    getLeftPlayer(player:Player) : Player{
        let playerId:number = this.getPlayerId(player);
        if(playerId == -1){
            throw new Error('player not in collection');
        }
        let leftPlayerId:number = Math.abs( playerId - 1 + this.getNbPlayer() ) % this.getNbPlayer();
        return this.arrPlayers[ leftPlayerId ];
    }

    getFacePlayer(player:Player){
        let playerId:number = this.getPlayerId(player);
        if(playerId == -1){
            throw new Error('player not in collection');
        }
        //Todo : If nb player = 4
        let leftPlayerId:number = Math.abs( playerId - 2 + this.getNbPlayer() ) % this.getNbPlayer();
        return this.arrPlayers[ leftPlayerId ];
    }

    getRightPlayer(player:Player) : Player {
        let playerId:number = this.getPlayerId(player);
        if(playerId == -1){
            throw new Error('player not in collection');
        }
        let rightPlayerId:number = (playerId + 1) % 4;
        return this.arrPlayers[ rightPlayerId ];
    }

    getPlayerId(player:Player):number{
        let res:number = -1;

        this.arrPlayers.forEach( (p, index) => {
            if( _.isEqual(p,player)){
                res = index;
            }
        });

        return res;
    }

    isFull(): boolean {
        return this.arrPlayers.length >= this.maxNbPlayer
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
    
    
}