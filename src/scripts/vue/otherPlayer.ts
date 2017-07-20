import { card } from './card'
import { Card } from '../modules/Card'

let template = `
<div class="other-player">
    <div class="other-player-info">
        <div class="player-info-name">{{ playerInfo.name }}</div>
        <div class="player-info-pv">PV : {{ playerInfo.pv }}</div>
        <div class="player-info-tricks">Tricks : {{ playerInfo.nbTricks }}</div>
        <div class="player-info-bet">Bet : {{ playerInfo.betValue }}</div>
    </div>
    <div class="other-player-card-played" v-if="cardPlayed">
        <card :card="cardPlayed" />
        <div class="card-played-value" v-if="cardPlayed.isExcuse()">
            {{  cardPlayed.value }}
        </div>
    </div>
</div>
`

export const otherPlayer = {
    template : template,
    props : ['playerInfo'],
    data(){
        return {
        }
    },
    computed : {
        cardPlayed: function(){ return this.playerInfo.cardPlayed && new Card(this.playerInfo.cardPlayed._value) }
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
        // auto(){
        //     this.$socket.emit('lobby-auto')
        // }
    }
}