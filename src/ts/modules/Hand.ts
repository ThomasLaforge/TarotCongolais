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

    length() : number{
        return this.arrCard.length;
    }

    addCards(arrCard:Array<Card>){
        arrCard.forEach( card => {
            this.arrCard.push(card);
        })
    }

    playCard(card:Card): Card{
        let indexOfCard:number = this.indexOfCard(card);
        let res:boolean = false;
        if (indexOfCard > -1){
            return this.arrCard.splice(indexOfCard,1)[0];
        }
        else{
            throw new Error(`card doesn't exist`);
        }
    }

    playFirstCard():Card{
        return this.playCard(this.arrCard[0]);
    }

    indexOfCard(card:Card){
        let res:number = -1;
        this.arrCard.forEach( (c, index) => {
            if( _.isEqual(c,card)){
                res = index;
            }
        })
        return res;
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