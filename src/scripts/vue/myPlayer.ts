import { GameState } from '../modules/TarotCongolais'
import { card } from './card'

let template = `
<div class="my-player">
    <div class="my-player-cards" v-if="myPlayer.hand">
        <card v-for="(card, i) in myPlayer.hand" :key="i" :value="card.value" :selected="selectedCard === i"/>
    </div>
    <div class="my-player-info">
        <div class="player-info-name">PV : {{ myPlayer.pv }}</div>
        <div class="player-info-tricks">Tricks : {{ myPlayer.nbTricks }}</div>
        <div class="player-info-bet">Bet : {{ myPlayer.betValue }}</div>
        <div class="player-info-ready">isReady : {{ myPlayer.isReady }}</div>
    </div>

    <div class="my-player-actions">
        <div v-if="toBet">
            <input type="number" min="0" :max="turnNbCard" v-model="betValue" />
            <button @click="bet">Bet {{betValue}}</button>
        </div>
        <button v-if="toReady">Ready</button>
    </div>
</div>
`

export const myPlayer = {
    template : template,
    props : ['myPlayer', 'gameState'],
    data() : { selectedCard: number, betValue: number, turnNbCard: number } {
        return {
            selectedCard : null,
            betValue : 0,
            turnNbCard: 5
        }
    },
    computed : {
        toReady : function(){ console.log(this.gameState); return this.gameState === GameState.WaitingToBeReady },
        toBet: function() { return this.gameState === GameState.Bet },
        toPlay: function() { return this.gameState === GameState.Play }
    },
    components: {
        card
    },
    sockets: {
        // enter_gameroom(gameRoomId:string){
        //     this.$router.push({path: '/board/' + gameRoomId });
        // }
    },
    methods: {
        bet(){
            this.$socket.emit('player_bet', 1)
        }
    }
}