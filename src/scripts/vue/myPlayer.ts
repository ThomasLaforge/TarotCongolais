import { GameState } from '../modules/TarotCongolais'
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
        <div class="player-info-ready">isReady : {{ myPlayer.isReady }}</div>
    </div>

    <div class="my-player-actions">
        <div v-if="toBet">
            <input type="number" min="0" :max="turnNbCard" v-model="betValue" />
            <button @click="bet">Bet {{betValue}}</button>
        </div>
        <button v-if="toReady" @click="ready">Ready</button>
        <button v-if="toPlay" @click="play">Play</button>
    </div>

    <div class="my-player-main">
        <div class="my-player-hand" v-if="myPlayer.hand">
            <card v-for="(card, i) in myPlayer.hand" :key="i" :value="card.value" :selected="selectedCard === i" @selection="selectCard(i)"/>
        </div>
        <div class="player-info-pv"> <img :src="pvImgPath" /> </div>
    </div>
</div>
`

export const myPlayer = {
    template : template,
    props : ['myPlayer', 'gameState'],
    data() : { selectedCard: number, betValue: number, turnNbCard: number, lifeColor: string } {
        return {
            selectedCard : null,
            betValue : 0,
            turnNbCard: 5,
            lifeColor: LifeColors.Spades
        }
    },
    computed : {
        toReady : function(){ return this.gameState === GameState.WaitingToBeReady },
        toBet: function() { return this.gameState === GameState.Bet },
        toPlay: function() { return this.gameState === GameState.Play },
        waitingPlayers: function() { return this.gameState === GameState.WaitingPlayers },
        waitingToBeReady: function() { return this.gameState === GameState.WaitingToBeReady },
        pvImgPath: function(){
            return '../../img/cartes/' + this.lifeColor + this.myPlayer.pv + '.jpeg' 
        },
        notInGame: function(){ 
            return this.waitingPlayers || this.waitingToBeReady || this.toReady
        },
        onGame: function(){ return !this.notInGame }
    },
    components: {
        card
    },
    sockets: {},
    methods: {
        // ready(){ this.$socket.emit('player_is_ready') },
        // bet(){ this.$socket.emit('player_bet', this.betValue) },
        // play(){ 
        //     if(this.selectedCard){
        //         this.$socket.emit('player_play', this.myPlayer.hand[this.selectedCard])
        //     }
        // },
        selectCard(cardIndex){ 
            this.selectedCard = cardIndex !== this.selectedCard ? cardIndex : null
            console.log('selected', this.selectedCard)
        }
    }
}