import { chat } from './chat'
import { otherPlayer } from './otherPlayer'
import { myPlayer } from './myPlayer'
import { VueBoardData, GameState } from '../modules/TarotCongolais'

let template = `
<div class="board">
    <h2>{{gameroomid}}</h2>

    State: {{ gameState }}

    <div class="boardgame">
        <div class="other-players">
            <otherPlayer v-for="playerInfo in playersInfos" :playerInfo="playerInfo" />
        </div>
        <myPlayer :myPlayer="me" />
        <button v-if="showReadyButton" @click="ready">Ready</button>
    </div>

    <chat socketActionSendMessage="new_game_message" />
</div>
`


export const board = {
    template : template,
    props : [ 'gameroomid' ],
    data: function(): VueBoardData {
        return {
            hands : {
                top: [],
                me: [],
                left: [],
                right: []
            },
            gameState : GameState[GameState.WaitingPlayer]
        }
    },
    components : {
        chat,
        myPlayer,
        otherPlayer
    },
    sockets : {
        start_game(gameData: any){
            
        },
        isOnGame(isOnGame: boolean){
            if(!isOnGame){
                this.$router.push({path: '/login'});
            }
        },
        game_is_full(){
            this.gameState = GameState[GameState.WaitingPlayerToBeReady]
        },
        game_is_starting(){
            console.log('game is starting')
            this.gameState = GameState[GameState.InGame]
        },
        
	},
    computed : {
        showReadyButton : function(){ return this.gameState === GameState.WaitingPlayerToBeReady } 
    },
	methods: {
        ready(){ this.$socket.emit('player_is_ready')}
	},
    mounted: function(){
        // Checking integrity => Fuck hackers
        this.$socket.emit('isLoggedIn')
        this.$socket.emit('isOnGame', this.gameroomid)
    },
    beforeRouteLeave(to:string, from:string, next:Function) {
        // called when the route that renders this component is about to
        // be navigated away from.
        // => refresh and navigate (back or after)
        console.log('beforeRouteLeave', to, from)
        // let answer = confirm('Are you sure to leave the game?');
        // next(answer)

        // never leave
        // next(false)
        
        next(true)
    }
}