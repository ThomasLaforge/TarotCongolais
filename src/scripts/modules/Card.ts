export class Card {
    
    private _value:number;

    constructor(value:number) {
        this._value = value;
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

	public set value(value: number) {
		this._value = value;
	}
    
}