import { card } from './card'

let template = `
<div class="my-player">
    <div class="my-player-cards">
        <card v-for="(card, i) in myPlayer.cards" :key="i" :value="card" :selected="selectedCards.indexOf(i) !== -1"/>
    </div>
    <div class="my-player-info">
            <div class="player-info-name">PV : {{ myPlayer.pv }}</div>
        <div class="player-info-tricks">Tricks : {{ myPlayer.nbTricks }}</div>
        <div class="player-info-bet">Bet : {{ myPlayer.betValue }}</div>
        <div class="player-info-ready">isReady : {{ myPlayer.isReady }}</div>
    </div>
</div>
`

export const myPlayer = {
    template : template,
    props : ['myPlayer'],
    data() : { selectedCards: number[] } {
        return {
            selectedCards : []
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
        // auto(){
        //     this.$socket.emit('lobby-auto')
        // }
    }
}