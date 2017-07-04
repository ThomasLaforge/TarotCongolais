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
    <button @click="bet">Bet 1</button>
</div>
`

export const myPlayer = {
    template : template,
    props : ['myPlayer'],
    data() : { selectedCard: number } {
        return {
            selectedCard : null
        }
    },
    computed : {
        isReady : function(){ console.log( this.myPlayer ); return this.myPlayer.isReady }
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