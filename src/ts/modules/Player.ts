import {Hand} from '../modules/Hand';

export class Player{

    private _username:string;
	private _hand:Hand;

    constructor( username:string ){
        this._username 	= username;
		this._hand		= new Hand();
    }

	public get username(): string {
		return this._username;
	}
	public set username(value: string) {
		this._username = value;
	}
	

}