import {Trick} from './Trick';
import {Player} from './Player';
import {Bet} from './Bet';
import {PlayerCollection} from './PlayerCollection';
import * as  _ from 'lodash';

export class Turn {

    private _playerCollection: PlayerCollection;
    private _firstPlayer: Player;
    private _nbCards: number;
    private _arrTrick:Array<Trick>;
    private _arrBet:Array<Bet>;

	constructor(firstPlayer: Player, nbCards: number, pc: PlayerCollection, arrTrick: Array<Trick> = [], arrBet: Array<Bet> = []) {
        this.playerCollection = pc;
        this.firstPlayer = firstPlayer;
        this.nbCards = nbCards;
		this.arrTrick = arrTrick;
		this.arrBet = arrBet;
	}

    getLosers():Array<Player>{
        let res:Array<Player> = [];

        this.playerCollection.arrPlayers.forEach( player => {
            let score:number = 0;
            
            this.arrTrick.forEach(trick => {
                if( _.isEqual(trick.getWinner(), player) ){
                    score++;
                }
            });

            if(score != this.getBetFromPlayer(player)){
                res.push(player);
            }
        });

        return res;
    }

    allPlayerBet(){
        return this.getPlayersHavingBet().length === this.playerCollection.getNbPlayer();
    }

    getPlayersHavingBet():Array<Player>{
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

    addTrick(trick: Trick){
        this.arrTrick.push(trick)
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
	public get playerCollection(): PlayerCollection {
		return this._playerCollection;
	}
	public set playerCollection(value: PlayerCollection) {
		this._playerCollection = value;
	}
	public get firstPlayer(): Player {
		return this._firstPlayer;
	}
	public set firstPlayer(value: Player) {
		this._firstPlayer = value;
	}
	public get nbCards(): number {
		return this._nbCards;
	}
	public set nbCards(value: number) {
		this._nbCards = value;
	}
    
    
    

}