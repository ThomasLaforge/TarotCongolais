import { chat } from './chat'

let template = `
<div>
    <div class="boardgame">
        <div id="cards-zone-top" class="cards-zone cards-zone-top">
            <div class="card-in-cards-zone" v-for="card in hands.top" />
        </div>        

        <div id="cards-zone-left" class="cards-zone cards-zone-left">
            <div class="card-in-cards-zone" v-for="card in hands.left" />        
        </div>
        
        <div id="cards-zone-right" class="cards-zone cards-zone-right">
            <div class="card-in-cards-zone" v-for="card in hands.right" />            
        </div>
        
        <div id="cards-zone-me" class="cards-zone cards-zone-me">
            <div class="card-in-cards-zone" v-for="card in hands.me" />
        </div>
    </div>

    <chat socketActionSendMessage="new_game_message" />
</div>
`


export const board = {
    template : template,
    data: function(){
        return {
            hands : {
                top: [],
                me: [],
                left: [],
                right: []
            }
        }
    },
    components : {
        chat
    },
    sockets:{
        start_game(gameData: any){
            
        }
	},
	methods: {

	},
    mounted: function(){
        this.$socket.emit('isLoggedIn')
        console.log('player on table')
    }
}