import {Hand} from '../modules/Hand';

export class Player{

    private _username:string;
	private _hand:Hand;
	private _pv:number;

    constructor( username:string, pv:number = 10 ){
        this._username 	= username;
		this._hand		= new Hand();
		this._pv		= pv;
    }

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