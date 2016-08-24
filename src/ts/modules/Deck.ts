import {Card} from './Card';
import * as Utils from './utils';

export class Deck {
    //Constructor   : arrayDeck with all cards, shuffle him, and create a discard array
    //removeCard    : remove a card from the rest of the game
    //shuffle       : shuffle an in deck
    //shuffleDeck   : shuffle the arrayDeck
    //length        : give the length of the deck
    //pickCards     : return an array with the firts cards of the deck. 
    private _arrayDeck:Array<Card>;

    constructor() {
        this._arrayDeck = [];
        this.init();
    }

    init(){
        this.reset();
    }

    reset(){
        for (let i=0; i <= 21; i++) {
            this.arrayDeck.push(new Card(i));
        }
        this.shuffleDeck();
    }
    
    removeCard(card:Card) {
        var pos = this.arrayDeck.indexOf(card);
		if(pos > -1){
			this.arrayDeck.splice(pos, 1);
		}
		else{
			console.log(`Tentative de suppression d'une carte qui n'est pas présente dans la main`);
		}
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
    
    
}