import { ExcuseValue, EXCUSE_VALUE_LOW, EXCUSE_VALUE_HIGH } from './TarotCongolais'

export class Card {
    
    private _value:number;

    constructor(value:number) {
        this._value = value;
    }

    choseExcuseValue(val: ExcuseValue){
        this._value = val === ExcuseValue.HIGH ? EXCUSE_VALUE_HIGH : EXCUSE_VALUE_LOW
    }

    getPath(){
        return ( this.value === -1 || this.value === 0 || this.value === 22 ) ? 0 : this.value
    }

    log(){
        console.log('value : ' + this.value);
    }

    /**
     * Getters / Setters
     */
	public get value(): number {
		return this._value;
	}
    
}