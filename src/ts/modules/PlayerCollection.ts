import {Player} from './PLayer';
import * as Utils from './utils';
import * as  _ from 'lodash';

export class PlayerCollection {

    private _arrPlayers:Array<Player>;
    private _indexFirstPlayer:number;

	constructor(arrPlayers: Array<Player> = []) {
        this.indexFirstPlayer = 0;
        this.arrPlayers = arrPlayers;
	}

    addPlayer(p:Player){
        this.arrPlayers.push(p);
    }

    shuffle(){
        Utils.shuffle(this.arrPlayers);
    }

    getPlayers(){
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

    getPlayerBySocketId(sockedId:any){
        let res:Player;

        this.arrPlayers.forEach( (p) => {
            if(p.socketId == sockedId){
                res = p;
            }
        });

        return res;
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
    
    
}