import { chat } from './chat'

let template = `
<div>
    <div class="boardgame">
        <div id="cards-zone-1" class="cards-zone cards-zone-1"></div>
        <div id="cards-zone-2" class="cards-zone cards-zone-2"></div>
        <div id="cards-zone-3" class="cards-zone cards-zone-3">
            <!--<div class="card-in-cards-zone"></div>-->
            <!--<div class="card-in-cards-zone"></div>-->
            <!--<div class="card-in-cards-zone"></div>-->
            <!--<div class="card-in-cards-zone"></div>-->
        </div>
        <div id="cards-zone-4" class="cards-zone cards-zone-4"></div>
    </div>

    <chat />
</div>
`

export const board = {
    template : template,
    data: function(){
        return {

        }
    },
    components : {
        chat
    },
    sockets:{
        
	},
	methods: {

	},
    mounted: function(){
        this.$socket.emit('is_on_game')
    }
}