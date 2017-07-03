import { chat } from './chat'
import { otherPlayer } from './otherPlayer'
import { myPlayer } from './myPlayer'
import { VueBoardData, GameState } from '../modules/TarotCongolais'

import * as _ from 'lodash'

let template = `
<div class="board">
    <h2>{{gameroomid}}</h2>

    State: {{ gameStateName }}

    <div class="boardgame">
        <div class="other-players">
            <otherPlayer v-for="playerInfoIndex in Object.keys(others)" :key="playerInfoIndex" :playerInfo="others[playerInfoIndex]" />
        </div>
        <hr />
        <myPlayer :myPlayer="me" />
        <hr />
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
            others : {},
            me : { 
                betValue : null, 
                cardPlayed: null, 
                hand: null, 
                handLength: null, 
                isReady: null, 
                name: null, 
                nbTricks: null, 
                pv: null
            },
            gameState : GameState.WaitingPlayer
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
            console.log('game is full')
            this.gameState = GameState.WaitingPlayerToBeReady
        },
        game_is_starting(){
            console.log('game is starting')
            this.gameState = GameState.InGame
        },
        self_board_update(dataForPlayer:any){
            this.me = Object.assign(this.me, dataForPlayer)
            console.log('this.me', this.me)
        },
        other_board_update(dataForOthers:any){
            let objCopy = _.cloneDeep(this.others)
            objCopy[dataForOthers.name] = Object.assign(objCopy[dataForOthers.name] || {}, dataForOthers)
            this.others = objCopy;
        }

	},
    computed : {
        showReadyButton : function(){ return this.gameState === GameState.WaitingPlayerToBeReady && !this.isReady},
        gameStateName : function(){ return GameState[this.gameState] },
        isReady : function(){ return this.me && !!this.me.isReady }
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