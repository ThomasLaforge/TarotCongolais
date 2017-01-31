import {Player} from './Player';

export class Bet {

    private _player:Player;
    private _bet:number;


	constructor(player: Player, bet: number) {
		this._player = player;
		this._bet = bet;
	}
    
    /**
     * Getters / Setters
     */
	public get player(): Player {
		return this._player;
	}
	public set player(value: Player) {
		this._player = value;
	}
	public get bet(): number {
		return this._bet;
	}
	public set bet(value: number) {
		this._bet = value;
	}
    

}