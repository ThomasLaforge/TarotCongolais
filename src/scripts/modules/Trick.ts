import { Player } from './Player';
import { PlayerCollection } from './PlayerCollection';
import { Card } from './Card';
import { Play } from './Play';
import * as  _ from 'lodash';

// Trick = un pli
export class Trick {

    private _arrPlay:Array<Play>;
    private _playerCollection: PlayerCollection;

    constructor(playerCollection: PlayerCollection, arrPlay: Array<Play> = []){
        this.playerCollection = playerCollection;
        this.arrPlay = arrPlay;
    }

    addPlay(play:Play){
        let player = play.player;
        if( this.isPlayerToPlay(player) ) {
            this.arrPlay.push(play);
        }
        else{
            throw new Error('Not good player to play');
        }
    }

    getWinner(): Player { 
        if(this.allPlayerHavePlayed())
        return this.getLeader()
    }
    
    getLeader(): Player {
        let res: Player;
        let maxValueCard:number = -1;

        this.arrPlay.forEach( (play: Play) => {
            if(play.card.value > maxValueCard){
                maxValueCard = play.card.value;
                res = play.player;
            }
        });

        return res;
    }


    playerAlreadyPlayed(p: Player){
        let res:boolean = false;
        this.arrPlay.forEach( (play: Play) => {
            if(_.isEqual(play.player, p)){
                res = true;
            }
        })
        return res;
    }

    isPlayerToPlay(p: Player){
        let nbPlayerAlreadyPlay = this.arrPlay.length;
        let playerToPlay = this.playerCollection.getPlayersPOV(this.playerCollection.getFirstPlayer())[ nbPlayerAlreadyPlay - 1 + 1];
        
        return _.isEqual(playerToPlay, p)
    }

    getListOfPlayerHavingPlayed(){
        return this.playerCollection.getPlayers().filter( (p: Player) => { return this.playerAlreadyPlayed(p) } )
    }

    allPlayerHavePlayed(){
        return this.getListOfPlayerHavingPlayed().length === this.playerCollection.maxNbPlayer
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