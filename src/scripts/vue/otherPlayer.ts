import { card } from './card'

let template = `
<div class="other-player">
    <div class="other-player-info">
        <div class="player-info-name">{{ otherPlayer.name }}</div>
        <div class="player-info-name">PV : {{ otherPlayer.pv }}</div>
        <div class="player-info-tricks">Tricks : {{ otherPlayer.nbTricks }}</div>
        <div class="player-info-bet">Bet : {{ otherPlayer.betValue }}</div>
    </div>
    <div class="other-player-card-played">
        <card :value="otherPlayer.cardValue" />
    </div>
</div>
`

export const otherPlayer = {
    template : template,
    props : ['otherPlayer'],
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