// Trick = un pli
import { Player } from './Player';
import { Card } from './Card';
import { Play } from './Play';
import * as  _ from 'lodash';

export class Trick {

    private _arrTrick:Array<Play>;

    constructor(){
        this.arrTrick = [];
    }

    addplay(play:Play){
        if(!this.playerAlreadyPlayed(play.player)){
            this.arrTrick.push(play);
        }
        else{
            throw new Error('Player already played');
        }
    }

    getPlayerWinner():Player{
        let res:Player;
        let maxValueCard:number = -1;

        this.arrTrick.forEach(play => {
            if(play.card.value > maxValueCard){
                maxValueCard = play.card.value;
                res = play.player;
            }
        });

        return res;
    }

    playerAlreadyPlayed(p:Player){
        let res:boolean = false;
        this.arrTrick.forEach( play => {
            if(_.isEqual(play.player,p)){
                res = true;
            }
        })
        return res;
    }

    /**
     * Getters / Setters
     */
	public get arrTrick(): Array<Play> {
		return this._arrTrick;
	}
	public set arrTrick(value: Array<Play>) {
		this._arrTrick = value;
	}
    
    
}