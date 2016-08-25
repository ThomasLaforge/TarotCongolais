// Trick = un pli
import { Player } from './Player';
import { Card } from './Card';
import * as  _ from 'lodash';

interface ISoloTrick {
    player:Player;
    card:Card;
}

export class Trick {
    
    private _nbPlayer:number;
    private _arrSoloTrick:Array<ISoloTrick>;

    constructor(nbPlayer:number){
        this.nbPlayer = nbPlayer;
        this.arrSoloTrick = [];
    }

    addSoloTrick(soloTrick:ISoloTrick){
        if(!this.playerAlreadyPlayed(soloTrick.player)){
            this.arrSoloTrick.push(soloTrick);
        }
        else{
            throw new Error('Player already played');
        }
    }

    isDone() : boolean{
        return this.arrSoloTrick.length == this.nbPlayer;
    }

    playerAlreadyPlayed(p:Player){
        let res:boolean = false;
        this.arrSoloTrick.forEach( soloTrick => {
            if(_.isEqual(soloTrick.player,p)){
                res = true;
            }
        })
        return res;
    }

    /**
     * Getters / Setters
     */
	public get nbPlayer(): number {
		return this._nbPlayer;
	}
	public set nbPlayer(value: number) {
		this._nbPlayer = value;
	}

	public get arrSoloTrick(): Array<ISoloTrick> {
		return this._arrSoloTrick;
	}
	public set arrSoloTrick(value: Array<ISoloTrick>) {
		this._arrSoloTrick = value;
	}
    
    
}