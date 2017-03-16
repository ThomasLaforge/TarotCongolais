// Trick = un pli
import { Player } from './Player';
import { PlayerCollection } from './PlayerCollection';
import { Card } from './Card';
import { Play } from './Play';
import * as  _ from 'lodash';

export class Trick {

    private _arrPlay:Array<Play>;
    private _playerCollection: PlayerCollection;

    constructor(playerCollection: PlayerCollection, arrPlay: Array<Play> = []){
        this.playerCollection = playerCollection;
        this.arrPlay = arrPlay;
    }

    addPlay(play:Play){
        if(!this.playerAlreadyPlayed(play.player)){
            this.arrPlay.push(play);
        }
        else{
            throw new Error('Player already played');
        }
    }

    getWinner():Player{
        let res:Player;
        let maxValueCard:number = -1;

        this.arrPlay.forEach(play => {
            if(play.card.value > maxValueCard){
                maxValueCard = play.card.value;
                res = play.player;
            }
        });

        return res;
    }

    playerAlreadyPlayed(p:Player){
        let res:boolean = false;
        this.arrPlay.forEach( play => {
            if(_.isEqual(play.player,p)){
                res = true;
            }
        })
        return res;
    }

    /**
     * Getters / Setters
     */
	public get arrPlay(): Array<Play> {
		return this._arrPlay;
	}
	public set arrPlay(value: Array<Play>) {
		this._arrPlay = value;
	}
	public get playerCollection(): PlayerCollection {
		return this._playerCollection;
	}
	public set playerCollection(value: PlayerCollection) {
		this._playerCollection = value;
	}
    
    
    
}