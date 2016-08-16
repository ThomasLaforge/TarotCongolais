export class Player{

    private _username:string;

    constructor( username:string ){
        this._username = username;
    }


	public get username(): string {
		return this._username;
	}
	public set username(value: string) {
		this._username = value;
	}
	

}