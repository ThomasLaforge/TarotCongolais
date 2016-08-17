import {Card} from './Card';

export class Hand {

    private _arrCard:Array<Card>;

    constructor(arrOfCard:Array<Card> = []){
        this._arrCard = arrOfCard.slice();
    }

    console(){
        for (let i = 0; i < this.arrCard.length; i++) {
            this.arrCard[i].console();
        }
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