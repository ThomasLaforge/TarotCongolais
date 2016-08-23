export class Timer {

    private _start:Date;

    constructor(){
        this.start = new Date();
    }

	getTimeSinceStart() : number { //Time in miliseconds since 1901-01-01
		let now = new Date();
		return now.getTime() - this.start.getTime();
	}

    /**
     * Getters / Setters
     */

	public get start(): Date {
		return this._start;
	}
	public set start(value: Date) {
		this._start = value;
	}
    

}