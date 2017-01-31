import {Card} from './Card';
import * as _ from 'lodash';

class Deck {
    //Constructor   : arrayDeck with all cards, shuffle him, and create a discard array
    //removeCard    : remove a card from the rest of the game
    //shuffle       : shuffle the arrayDeck
    //length        : give the length of the deck
    //drawCards     : return an array with the firts cards of the deck.

    private _arrayDeck: Array<Card>;
    private _arrayDiscard: Array<Card>;

    constructor(arrayDeck? : Array<Card>) {
        if(!arrayDeck){
            this.arrayDeck = []
            this.initDeck();
        }
    }

    initDeck():void{
        for (let value = 0; value <= 21; value++) {
            this.addCard( value );
        }
        this.shuffle();
    }

    // States of arrays : deck and discard

    isEmpty(){
        return this.arrayDeck.length <= 0;
    }

    getNbCards(){
        return this.arrayDeck.length;
    }

    shuffle(){
        this.arrayDeck = _.shuffle( this.arrayDeck );
    }

    addCard(card:Card|number){
        if( !(card instanceof Card) ){ 
            card = new Card(card)
        }
        this.arrayDeck.push(card);
    }

    addCardsToTheEnd(cards:Array<Card>){ 
        cards.forEach( card => {
            this.addCard(card)
        });
    }
    
    addCardOnTop(cards:Array<Card>){
        cards.forEach( card => {    
            this.arrayDeck.unshift(card)
        });
    }

    // Missing control if empty
    drawCards( nbCards:number ){
        let res: Array<any> = [];
        for( let i=0; i < nbCards; i++ ){
            if(this.arrayDeck.length > 0){
                res.push( this.drawOneCard() );
            }
        }

        return res;
    }

    // Could be recursive ?
    drawOneCard(){
        let res:any = null;

        if ( !this.isEmpty() ) {
            res = this.arrayDeck[0];
            this.arrayDeck.splice( 0, 1 );
        }
        else {
          throw new Error('No more cards in this deck');
        }

        return res;
    }

    getAllCards() : Array<Card>{
        return this.arrayDeck;
    }

    getCopyOfCard(index: number){
        if(index < 0 || index > this.arrayDeck.length - 1){
            throw new Error('Try to get a card at index : ' + index + ' who doesn\'t exist in deck')
        }
        return this.arrayDeck[index]
    }

    get arrayDeck(){
        return this._arrayDeck
    }
    set arrayDeck(array){
        this.arrayDeck = array
    }
    get arrayDiscard(){
        return this._arrayDiscard
    }
    set arrayDiscard(array){
        this.arrayDiscard = array
    }
}

export { Deck };
