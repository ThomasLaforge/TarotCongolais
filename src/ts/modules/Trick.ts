// Trick = un pli
import { Player } from './Player';
import { Card } from './Card';

interface ISoloTrick {
    player:Player;
    card:Card;
}

export class Trick {
    
    private _nbPlayer:number;
    private _arrSoloTrick:Array<ISoloTrick>;

    constructor(nbPlayer:number){
        this.nbPlayer = nbPlayer;
    }

    addSoloTrick(soloTrick:ISoloTrick){
        this.arrSoloTrick.push();
    }

    isDone() : boolean{
        return this.arrSoloTrick.length == this.nbPlayer;
    }



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