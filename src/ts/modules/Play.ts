import {Player} from './Player'; 
import {Card} from './Card'; 

export class Play {

    private _player:Player;
    private _card:Card;


	constructor(player: Player, card: Card) {
		this._player = player;
		this._card = card;
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
	public get card(): Card {
		return this._card;
	}
	public set card(value: Card) {
		this._card = value;
	}
    

}