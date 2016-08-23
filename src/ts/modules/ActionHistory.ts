import {Player} from './Player';
import {Hand} from './Hand';

export enum GameAction {
    Start,
    End,
    Play,
    Bet,
    Turn
}

export interface IActionHistory {
    time    : Date;
    type    : GameAction;
    value   : string | number | Hand;
    player? : Player;
}

export class ActionHistory implements IActionHistory {

    private _player: Player;
    private _value: string | number | Hand;
    private _type: GameAction;
    private _time: Date;

    constructor(type:GameAction, value?:string | number | Hand, player?: Player){
        this.time = new Date();
        this.type = type;
        if(player) this.player = player;
        if(value) this.value = value;
    }

    // Todo : implements to check if action is possible/Full parameters
    isSafe(){
        return true;
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

    public get value(): string | number | Hand {
        return this._value;
    }
    public set value(value: string | number | Hand) {
        this._value = value;
    }

    public get type(): GameAction {
        return this._type;
    }
    public set type(value: GameAction) {
        this._type = value;
    }

    public get time(): Date {
        return this._time;
    }
    public set time(value: Date) {
        this._time = value;
    }
}