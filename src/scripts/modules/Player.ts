import {Hand} from '../modules/Hand';

export class Player{

    private _username:string;
	private _hand:Hand;
	private _pv:number;
	private _socketId:any;

    constructor( username:string, socketId:any, pv:number = 10 ){
        this._username 	= username;
		this._hand		= new Hand();
		this._pv		= pv;
		this._socketId 	= socketId;
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
	public get socketId(): any {
		return this._socketId;
	}
	public set socketId(value: any) {
		this._socketId = value;
	}
		
	

}