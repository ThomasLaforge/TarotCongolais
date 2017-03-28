import {Hand} from './Hand';
import {PlayerInterface} from './TarotCongolais'

export class Player implements PlayerInterface {

    private _username:string;
	private _hand:Hand;
	private _pv:number;

    constructor( username:string, pv:number = 10 ){
        this._username 	= username;
		this._hand		= new Hand();
		this._pv		= pv;
    }

	losePV(nbPV = 1){
		this.pv -= nbPV
	}

	winPv(nbPV = 1){
		this.pv += nbPV
	}

	addCard(card: Card|Array<Card>){
		this.hand.addCards(card)
	}

	/**
	 * Getters / Setters
	 */
	public get username(): string {
		return this._username;
	}
	public set username(value: string) {
		this._username = value;
	}
	public get hand(): Hand {
		return this._hand;
	}
	public set hand(value: Hand) {
		this._hand = value;
	}
	public get pv(): number {
		return this._pv;
	}
	public set pv(value: number) {
		this._pv = value;
	}
		
	

}