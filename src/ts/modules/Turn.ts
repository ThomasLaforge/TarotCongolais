import {Trick} from './Trick';
import {Player} from './Player';
import {Bet} from './Bet';
import {PlayerCollection} from './PlayerCollection';
import * as  _ from 'lodash';



export class Turn {

    private _arrTrick:Array<Trick>;
    private _arrBet:Array<Bet>;

	constructor(arrTrick: Array<Trick>, arrBet: Array<Bet>) {
		this._arrTrick = arrTrick;
		this._arrBet = arrBet;
	}

    getLosers(playerCollection:PlayerCollection):Array<Player>{
        let res:Array<Player> = [];

        playerCollection.arrPlayers.forEach( player => {
            let score:number = 0;
            
            this.arrTrick.forEach(trick => {
                if( _.isEqual(trick.getPlayerWinner(), player) ){
                    score++;
                }
            });

            if(score != this.getBetFromPlayer(player)){
                res.push(player);
            }
        });

        return res;
    }

    getPlayerHavingBet():Array<Player>{
        let res:Array<Player> = [];

        this.arrBet.forEach(bet => {
            res.push(bet.player);
        });

        return res;
    }

    getBetFromPlayer(player:Player){
        let res:number;

        this.arrBet.forEach(bet => {
            if(bet.player == player){
                res = bet.bet;
            }
        });

        return res;
    }

    addbet(bet:Bet){
        if(!this.playerAlreadyBet(bet.player)){
            this.arrBet.push(bet);
        }
        else{
            throw new Error('Player already played');
        }
    }

    playerAlreadyBet(p:Player){
        let res:boolean = false;
        this.arrBet.forEach( bet => {
            if(_.isEqual(bet.player,p)){
                res = true;
            }
        })
        return res;
    }

    /**
     * Getters / Setters
     */
	public get arrTrick(): Array<Trick> {
		return this._arrTrick;
	}
	public set arrTrick(value: Array<Trick>) {
		this._arrTrick = value;
	}
	public get arrBet(): Array<Bet> {
		return this._arrBet;
	}
	public set arrBet(value: Array<Bet>) {
		this._arrBet = value;
	}
    

}