import {Player} from './Player';
import {Hand} from './Hand';
import {Card} from './Card';

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
    value   : string | number | Hand | Card;
    playerName? : string;
}

export class ActionHistory implements IActionHistory {

    private _playerName: string;
    private _value: string | number | Hand | Card;
    private _type: GameAction;
    private _time: Date;

    constructor(type:GameAction, value?:string | number | Hand | Card, playerName?: string){
        this.time = new Date();
        this.type = type;
        if(playerName) this._playerName = playerName;
        if(value) this.value = value;
    }

    // Todo : implements to check if action is possible/Full parameters
    isSafe(){
        return true;
    }

    /**
     * Getters / Setters
     */
    public get playerName(): string {
        return this._playerName;
    }
    public set playerName(value: string) {
        this._playerName = value;
    }

    public get value(): string | number | Hand | Card {
        return this._value;
    }
    public set value(value: string | number | Hand | Card) {
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