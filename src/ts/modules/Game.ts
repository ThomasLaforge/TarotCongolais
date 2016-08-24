import {Deck} from './Deck';
import {Player} from './Player';
import {PlayerCollection} from './Player';
import {Timer} from './Timer';
import {History} from './History';
import {ActionHistory} from './ActionHistory';
import * as Utils from './utils';

export class Game {
	
    private _deck:Deck;
    private _players:PlayerCollection;
    private _timer:Timer;
    private _history:History;
    private _indexfirstPlayer:number;
	private _turnCards:number;

    constructor(players:Array<Player>){
        this.timer            = new Timer();
		this.history          = new History()
        this.players          = players;
        this.indexfirstPlayer = Utils.getRandomPlayer(this.getNbPlayer());
		this.deck             = new Deck();
		this.dealCards();
		this.turnCards		  = this.getNbPlayer();
    }

    getFirstPlayer(){
        return this.players[this.indexfirstPlayer];
    }

	dealCards(){
		this.players.forEach( p => {
			let newPlayerCards = this.deck.pickCards(this._turnCards);
			p.hand.addCards()
		})
	}

	nextTurn(){
		this.turnCards = this.turnCards > 1 ? this.turnCards - 1 : this.getNbPlayer();
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

	public get timer(): Timer {
		return this._timer;
	}
	public set timer(value: Timer) {
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
	public get history(): History {
		return this._history;
	}
	public set history(value: History) {
		this._history = value;
	}
	public get turnCards(): number {
		return this._turnCards;
	}
	public set turnCards(value: number) {
		this._turnCards = value;
	}
    
    
}