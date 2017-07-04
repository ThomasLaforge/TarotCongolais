import {Trick} from './Trick';
import {Player} from './Player';
import {Bet} from './Bet';
import {PlayerCollection} from './PlayerCollection';
import * as  _ from 'lodash';

export class Turn {

    private _playerCollection: PlayerCollection;
    private _firstPlayer: Player;
    private _nbCards: number;
    private _arrTrick:Trick[];
    private _arrBet:Bet[];

	constructor(firstPlayer: Player, nbCards: number, pc: PlayerCollection, arrTrick: Trick[] = [], arrBet: Bet[] = []) {
        this.playerCollection = pc;
        this.firstPlayer = firstPlayer;
        this.nbCards = nbCards;
		this.arrTrick = arrTrick;
		this.arrBet = arrBet;
	}

    getLosers(): Player[] {
        let res: Player[] = [];

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

    getPlayersHavingBet(): Player[]{
        let res:Player[] = [];

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

    getNbWonTricks(player: Player){
        let sum = 0;
        this.arrTrick.forEach( t => { 
            sum += t.arrPlay.filter( p => { return p.player.username === player.username }).length
        })
        return sum;
    }

    /**
     * Getters / Setters
     */
	public get arrTrick(): Trick[] {
		return this._arrTrick;
	}
	public set arrTrick(value: Trick[]) {
		this._arrTrick = value;
	}
	public get arrBet(): Bet[] {
		return this._arrBet;
	}
	public set arrBet(value: Bet[]) {
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