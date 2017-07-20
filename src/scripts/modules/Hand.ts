import {Card} from './Card';
import * as  _ from 'lodash';

export class Hand {

    private _arrCard:Array<Card>;

    constructor(arrOfCard:Array<Card> = []){
        this._arrCard = arrOfCard.slice();
    }

    debug(){
        for (let i = 0; i < this.arrCard.length; i++) {
            this.arrCard[i].log();
        }
    }

    length() : number{
        return this.arrCard.length;
    }

    addCards(c:Array<Card>|Card){
        if(!Array.isArray(c)){
            c = [c];
        }
        c.forEach( card => {
            this.arrCard.push(card);
        })
    }

    playCard(card:Card | Card[]): void {
        let cards = Array.isArray(card) ? card : [card]
        cards.forEach(card => {
            let indexOfCard:number = this.indexOfCard(card);
            let res:boolean = false;
            if (indexOfCard > -1){
                this.arrCard.splice(indexOfCard,1)[0];
            }
            else{
                throw new Error(`card doesn't exist`);
            }
        })
    }

    playFirstCard(): void{
        this.playCard(this.arrCard[0]);
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
    public get cards(): Card[] {
        return this._arrCard;
    }

	public get arrCard(): Array<Card> {
		return this._arrCard;
	}
	public set arrCard(value: Array<Card>) {
		this._arrCard = value;
	}

}