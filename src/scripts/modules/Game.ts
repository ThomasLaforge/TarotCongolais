import {Deck} from './Deck';
import {Player} from './Player';
import {Card} from './Card';
import {PlayerCollection} from './PlayerCollection';
import {Play} from './Play';
import {Bet} from './Bet';
import {Timer} from './Timer';
import {Trick} from './Trick';
import {Turn} from './Turn';
import {History} from './History';
import {GameAction, ActionHistory} from './ActionHistory';
import * as Utils from './utils';
import * as _ from 'lodash';
import {DEFAULT_NB_PLAYER, ExcuseValue, GameState} from './TarotCongolais'

export class Game {
	
    private _deck:Deck;
    private _players:PlayerCollection;
    private _timer:Timer;
    private _history:History;
	private _turnCards:number;
	private _turn:Turn;
	private _actualTrick:Trick;
	private _gameState: GameState;

    constructor(players = new PlayerCollection(DEFAULT_NB_PLAYER)){
        this.timer            = new Timer();
		this.history          = new History();
        this.players          = players;
		this.deck             = new Deck();
		this.turnCards		  = Math.floor(this.deck.length() / this.getNbMaxPlayer());
		this.actualTrick 	  = new Trick(this.players);
		this.turn 			  = new Turn(this.turnCards, this.players);			
		this.gameState		  = GameState.WaitingPlayers
	}

	/**
	 * Game actions
	 */

	addPlayer(p: Player){
		this.players.addPlayer(p)
		if(this.players.isFull()){
			this.gameState = GameState.WaitingPlayersToBeReady
		}
	}

	addReadyPlayer(p: Player){
		this.players.addReadyPlayer(p);
		if(this.areAllPlayersReady()){
			this.start();
		}
	}

	start(){
		this.dealCards();
		this.gameState = GameState.WaitingPlayersToBet
	}

	dealCards(){
		this.players.getPlayers().forEach( p => {
			let newPlayerCards = this.deck.drawCards(this.turnCards);
			p.hand.addCards(newPlayerCards);
		});
	}

	// Turn
	choseExcuseValue(card: Card, val : ExcuseValue){
		card.choseExcuseValue(val)
	}

	addTrick() {
		this.turn.addTrick(this.actualTrick);
		this.actualTrick = new Trick(this.players);
	}


	nextTurn(){
		if( this.turnCards > 1 ) {
			this.turnCards--;
		} else { 
			this.turnCards = Math.floor( 22 / this.getNbPlayer() );
			this.changeFirstPlayer();
		}
		this.actualTrick = new Trick(this.players);
		this.turn = new Turn(this.turnCards, this.players);
	}

    changeFirstPlayer(){
		this.players.changeFirstPlayer();
    }

	// Play
	addPlay(play: Play){
		// Action
		play.player.playCard(play.card)
		let trickWinner = this.actualTrick.addPlay( play );
		if(trickWinner){
			this.addTrick();
		}
		// History
		let action = new ActionHistory(GameAction.Play, play.card, play.player.username);
		this.history.add(action);
	}

	// Bet
	addBet(bet: Bet){
		this.turn.addbet(bet)
	}

	/**
	 * Getters
	 */

	// Game
	isFull(){
		return this.players.isFull();
	}
	isNotFull(){
		return !this.isFull()
	}

	isReady(p: Player){
		return this.players.isPlayerReady(p)
	}

	areAllPlayersReady(){
		let allPlayerReady = this.players.areAllPlayersReady()
		if(allPlayerReady) { this.gameState = GameState.InGame }
		return this.players.areAllPlayersReady()
	}

	// First player
    getFirstPlayer(){
        return this.players.getFirstPlayer();
    }

	isFirstPlayer(p: Player){
		return _.isEqual(this.getFirstPlayer(), p)
	}

	// Play
	getPlayedCard(p: Player){
		let play = this.actualTrick.arrPlay.filter(play => { return play.player.username === p.username })[0]
		return play ? play.card : null
	}
	isPlayerToPlay(p: Player){
		return this.actualTrick.isPlayerToPlay(p)
	}

	// Turn
	getNbWonTrick(player: Player){
		return this.turn.getNbWonTricks(player)
	}

	getBet(p: Player){
		return this.turn.getBetFromPlayer(p)
	}
	isPlayerToBet(p: Player){
		return this.turn.isPlayerToBet(p)
	}
	areAllPlayersBet(){
		return this.turn.allPlayerBet()
	}

	// State
	getPlayerGameState(p: Player){
		let state = GameState.WaitingPlayers;

		if(this.isFull()){ 
			state = GameState.WaitingPlayersToBeReady
			if(!this.isReady(p)){
				state = GameState.WaitingToBeReady
			}
            
            if(this.areAllPlayersReady()) { 
                state = GameState.WaitingPlayersToBet

                if(this.areAllPlayersBet()){ 
                    state = GameState.WaitingPlayersToPlay
                    if(this.isPlayerToPlay(p)){
                        state = GameState.Play
                    } 
                }
                else{
                    if(this.isPlayerToBet(p)){
                        state = GameState.Bet;
                    }
                }
            }
        }
    
		return state;
	}

	/**
	 *  Getters / Setters
	 */

	public get timer(): Timer {
		return this._timer;
	}
	public set timer(value: Timer) {
		this._timer = value;
	}
	public get deck(): Deck {
		return this._deck;
	}
	public set deck(value: Deck) {
		this._deck = value;
	}
	public get players(): PlayerCollection {
		return this._players;
	}
	public set players(value: PlayerCollection) {
		this._players = value;
	}
	public getNbPlayer(): number {
		return this.players.getNbPlayer();
	}
	public getNbMaxPlayer(): number {
		return this.players.maxNbPlayer;
	}
	public get history(): History {
		return this._history;
	}
	public set history(value: History) {
		this._history = value;
	}
	public get turnCards(): number {
		return this._turnCards;
	}
	public set turnCards(value: number) {
		this._turnCards = value;
	}
	public get actualTrick(): Trick {
		return this._actualTrick;
	}
	public set actualTrick(value: Trick) {
		this._actualTrick = value;
	}
	public get turn(): Turn {
		return this._turn;
	}
	public set turn(value: Turn) {
		this._turn = value;
	}
	public get gameState(): GameState {
		return this._gameState;
	}
	public set gameState(newGameState) {
		this._gameState = newGameState;
	}
	
    
}