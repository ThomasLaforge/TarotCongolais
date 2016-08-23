import {Deck} from './Deck';
import {Player} from './Player';
import {Timer} from './Timer';
import {History} from './History';
import * as Utils from './utils';

export class Game {
	
    private _deck:Deck;
    private _players:Array<Player>;
    private _timer:Timer;
    private _history:History;
    private _indexfirstPlayer:number;

    constructor(players:Array<Player>){
        this._timer = new Timer();
		this._history = new History()
        this._players = players;
        this.indexfirstPlayer = Utils.getRandomPlayer(this.getNbPlayer());
    }

    getFirstPlayer(){
        return this.players[this.indexfirstPlayer];
    }

    switchPlayer(){
        if(this.indexfirstPlayer < this.getNbPlayer()){
            this.indexfirstPlayer += 1;
        }
        else{
            this.indexfirstPlayer = 0;
        }
        return this.indexfirstPlayer;
    }

	/**
	 *  Getters / Setters
	 */

	public get timer(): Date {
		return this._timer;
	}
	public set timer(value: Date) {
		this._timer = value;
	}
	
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
	public getNbPlayer(): number {
		return this.players.length;
	}
    
    
}