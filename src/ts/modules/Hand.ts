import {Card} from './Card';
import * as  _ from 'lodash';

export class Hand {

    private _arrCard:Array<Card>;

    constructor(arrOfCard:Array<Card> = []){
        this._arrCard = arrOfCard.slice();
    }

    debug(){
        for (let i = 0; i < this.arrCard.length; i++) {
            this.arrCard[i].console();
        }
    }

    addCards(arrCard:Array<Card>){
        arrCard.forEach( card => {
            this.arrCard.push(card);
        })
    }

    playCard(card:Card){
        let indexOfCard:number = this.indexOfCard(card);
        if (indexOfCard > -1){
            this.arrCard.splice(indexOfCard,1);
        }
    }

    indexOfCard(card:Card){
        this.arrCard.forEach( (c, index) => {
            if( _.isEqual(c,card)){
                return index;
            }
        })
        return -1;
    }

    /**
     * Getters / Setters
     */
	public get arrCard(): Array<Card> {
		return this._arrCard;
	}
	public set arrCard(value: Array<Card>) {
		this._arrCard = value;
	}

}