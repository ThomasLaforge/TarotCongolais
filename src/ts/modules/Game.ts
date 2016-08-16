import {Deck} from './Deck';
import {Player} from './Player';
import * as Utils from './utils';

export class Game {
    
    private _deck:Deck;
    private _players:Array<Player>;
    private _start:Date;
    private _indexfirstPlayer:number;

    constructor(players:Array<Player>){
        this._deck = new Deck();
        this._start = new Date();
        this._players = players;
        this.indexfirstPlayer = Utils.getRandomPlayer(this.getNbPlayer());
    }

    getFirstPlayer(){
        return this.players[this.indexfirstPlayer];
    }

    changeFirstPlayer(){
        if(this.indexfirstPlayer < this.getNbPlayer()){
            this.indexfirstPlayer += 1;
        }
        else{
            this.indexfirstPlayer = 0;
        }
        return this.indexfirstPlayer;
    }
   
	getNbPlayer(): number {
		return this.players.length;
	}


	/**
	 *  Getters / Setters
	 */
	public get deck(): Deck {
		return this._deck;
	}
	public set deck(value: Deck) {
		this._deck = value;
	}

	public get indexfirstPlayer(): number {
		return this._indexfirstPlayer;
	}
	public set indexfirstPlayer(value: number) {
		this._indexfirstPlayer = value;
	}

	public get players(): Array<Player> {
		return this._players;
	}
	public set players(value: Array<Player>) {
		this._players = value;
	}
    
    
}