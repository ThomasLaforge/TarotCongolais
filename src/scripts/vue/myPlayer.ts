import { GameState } from '../modules/TarotCongolais'
import { Card } from '../modules/Card'
import { card } from './card'

let LifeColors = {
    Hearts   : 'h',
    Clubs    : 'c',
    Diamonds : 'd',
    Spades   : 's'
}

let template = `
<div class="my-player">
    <div class="my-player-info" v-if="onGame">
        <div class="player-info-tricks">Tricks : {{ myPlayer.nbTricks }}</div>
        <div class="player-info-bet">Bet : {{ myPlayer.betValue }}</div>
    </div>

    <div class="my-player-actions">
        <div v-if="computedStates.toBet">
            <input type="number" min="0" :max="myPlayer.turnNbCard" v-model="betValue" />
            <button @click="bet">Bet {{betValue}}</button>
        </div>
        <button v-if="computedStates.toReady" @click="ready">Ready</button>
        <button v-if="computedStates.toPlay" @click="play">Play</button>
    </div>

    <div class="my-player-main" v-if="onGame">
        <div class="my-player-hand" v-if="myPlayer.hand">
            <card v-for="(card, i) in myPlayer.hand" :key="i" :card="card" :selected="selectedCard === i" @selection="selectCard(i)"/>
        </div>
        <div class="player-info-pv">
            <img :src="pvImgPath" />
        </div>
    </div>
</div>
`

export const myPlayer = {
    template : template,
    props : ['myPlayer', 'computedStates'],
    data() : { selectedCard: number, betValue: number, lifeColor: string } {
        return {
            selectedCard : null,
            betValue : 0,
            lifeColor: LifeColors.Spades
        }
    },
    computed : {
        pvImgPath: function(){
            return '../../img/cartes/' + this.lifeColor + this.myPlayer.pv + '.jpeg' 
        },
        notInGame: function(){ 
            return this.computedStates.waitingPlayers || this.computedStates.waitingToBeReady || this.computedStates.toReady
        },
        onGame: function(){ return !this.notInGame }
    },
    components: {
        card
    },
    sockets: {},
    methods: {
        ready(){ this.$socket.emit('player_is_ready') },
        bet(){ this.$socket.emit('player_bet', this.betValue) },
        play(){ 
            if(this.selectedCard){
                this.$socket.emit('player_play', this.myPlayer.hand[this.selectedCard])
            }
        },
        selectCard(cardIndex: number){
            if(this.toPlay){
                this.selectedCard = cardIndex !== this.selectedCard ? cardIndex : null
                console.log('selected', this.selectedCard)
            }
        }
    }
}