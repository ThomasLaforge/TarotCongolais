import { card } from './card'

let template = `
<div class="other-player">
    <div class="other-player-info">
        <div class="player-info-name">{{ playerInfo.name }}</div>
        <div class="player-info-name">PV : {{ playerInfo.pv }}</div>
        <div class="player-info-tricks">Tricks : {{ playerInfo.nbTricks }}</div>
        <div class="player-info-bet">Bet : {{ playerInfo.betValue }}</div>
        <div class="player-info-ready">isReady : {{ playerInfo.isReady }}</div>
    </div>
    <div class="other-player-card-played" v-if="playerInfo.card">
        <card :value="playerInfo.card.value" />
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