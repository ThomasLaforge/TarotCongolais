import {Card} from './Card';
import * as Utils from './utils';

export class Deck {
    // Constructor   : arrayDeck with all cards, shuffle him, and create a discard array
    // init / reset         : 
    // shuffleDeck   : shuffle the arrayDeck
    // length        : give the length of the deck
    // pickCards     : return an array with the firts cards of the deck. 
    private _arrayDeck:Array<Card>;
    private _nbNumerotedCards:number;

    constructor(nbNumerotedCards:number = 21) {
        this.nbNumerotedCards = nbNumerotedCards;
        this._arrayDeck = [];
        this.init();
    }

    init(){
        this.reset();
    }

    reset(){
        for (let i=0; i <= this.nbNumerotedCards; i++) {
            this.arrayDeck.push(new Card(i));
        }
        this.shuffleDeck();
    }
    
    shuffleDeck(){
        Utils.shuffle(this.arrayDeck);
    }
    
    length(){
        return this.arrayDeck.length;
    }
    
    pickCards(nbCards:number):Array<Card>{
        let res:Array<Card> = [];
        
        for(let i=0;i<nbCards;i++){
            res.push(this.arrayDeck[0]);
            this.arrayDeck.splice(0,1);
        }

        return res;
    }

    /**
     * Getters / Setters
     */
	public get arrayDeck(): Array<Card> {
		return this._arrayDeck;
	}
	public set arrayDeck(value: Array<Card>) {
		this._arrayDeck = value;
	}
	public get nbNumerotedCards(): number {
		return this._nbNumerotedCards;
	}
	public set nbNumerotedCards(value: number) {
		this._nbNumerotedCards = value;
	}
    
    
}