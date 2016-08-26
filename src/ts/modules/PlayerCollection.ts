import {Player} from './PLayer';
import * as  _ from 'lodash';

export class PlayerCollection {

    private _arrPlayers:Array<Player>;


	constructor(arrPlayers: Array<Player>) {
		this._arrPlayers = arrPlayers;
	}

    getNames():Array<string>{
        let res:Array<string> = [];
        
        this.arrPlayers.forEach( p => {
            res.push(p.username);
        });

        return res;
    }

    getNbPlayer(){
        return this.arrPlayers.length;
    }

    getLeftPlayer(player:Player) : Player{
        let playerId:number = this.getPlayerId(player);
        if(playerId == -1){
            throw new Error('player not in collection');
        }
        let leftPlayerId:number = playerId > 0 ? playerId - 1 : this.getNbPlayer() - 1;
        return this.arrPlayers[ leftPlayerId ];
    }

    getRightPlayer(player:Player) : Player {
        let playerId:number = this.getPlayerId(player);
        if(playerId == -1){
            throw new Error('player not in collection');
        }
        let rightPlayerId:number = playerId < this.getNbPlayer() - 1 ? playerId - 1 : 0;
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
    
}