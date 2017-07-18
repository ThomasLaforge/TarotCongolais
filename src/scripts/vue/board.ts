import { chat } from './chat'
import { otherPlayer } from './otherPlayer'
import { myPlayer } from './myPlayer'
import { VueBoardData, GameState } from '../modules/TarotCongolais'
import { Card } from '../modules/Card'

import * as _ from 'lodash'

let template = `
<div class="board">
    <h2>{{gameroomid}}</h2>

    <div class="board-game-state">
        State: {{ gameStateName }}
    </div>

    <div class="boardgame">
        <div class="other-players">
            <otherPlayer v-for="playerInfoIndex in Object.keys(others)" :key="playerInfoIndex" :playerInfo="others[playerInfoIndex]" />
        </div>
        <myPlayer :myPlayer="me" :gameState="gameState" />
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
                hand: [ new Card(0), new Card(4), new Card(5), new Card(2), new Card(4), new Card(5)],
                handLength: null,
                name: null, 
                nbTricks: null, 
                pv: 8
            },
            gameState: GameState.WaitingPlayers
        }
    },
    components : {
        chat,
        myPlayer,
        otherPlayer
    },
    sockets : {
        isOnGame(isOnGame: boolean){
            if(!isOnGame){
                this.$router.push({path: '/login'});
            }
        },
        new_player(username: string){
            let objCopy = _.cloneDeep(this.others)
            objCopy[username] = { name : username }
            this.others = objCopy;
        },
        first_step(initialOthers: any){
            console.log('first step', initialOthers)
            this.others = initialOthers;
        },
        self_board_update(dataForPlayer:any){
            this.me = Object.assign(this.me, dataForPlayer)
            console.log('self board update', this. me)
        },
        other_board_update(dataForOthers:any){
            let objCopy = _.cloneDeep(this.others)
            objCopy[dataForOthers.playerName] = Object.assign(objCopy[dataForOthers.playerName] || {}, dataForOthers.data)
            console.log('add other board data', objCopy[dataForOthers.playerName])
            this.others = objCopy;
        },
        update_game_state(newState: GameState){
            this.gameState = newState
        }

	},
    computed : {
        gameStateName : function(){ return GameState[this.gameState] },
        toReady : function(){ return this.gameState === GameState.WaitingToBeReady },
        toBet: function() { return this.gameState === GameState.Bet },
        toPlay: function() { return this.gameState === GameState.Play },
        waitingPlayers: function() { return this.gameState === GameState.WaitingPlayers },
        waitingToBeReady: function() { return this.gameState === GameState.WaitingToBeReady },
    },
	methods: {
	},
    mounted: function(){
        // Checking integrity => Fuck hackers
        // this.$socket.emit('isLoggedIn')
        // this.$socket.emit('isOnGame', this.gameroomid)
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