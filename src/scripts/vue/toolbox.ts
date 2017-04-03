import {LobbyListElt} from '../modules/TarotCongolais'
import {Player} from '../modules/Player'

let template = `
<div class="toolbox-zone">
    <h2>Toolbox</h2>
    <div class="toolbox-actions">
        <button class="toolbox-action-btn" @click="updateLobbyList">Update lobby list</button>
        <button class="toolbox-action-btn" @click="getAllPlayer">Player list</button>
        <button class="toolbox-action-btn" @click="getGameCollection">Game collection</button>
    </div>
</div>
`

export const toolbox = {
    template : template,
    data: function(){
        return {

        }
    },
    sockets : {
        update_lobby_list(list: Array<LobbyListElt>){
            console.log('actual lobby list', list);
        },
        getAllPlayer(list: Array<Player>){
            console.log('player list', list)
        },
        getGameCollection(gameCollection: GameCollection){
            console.log('game collection', gameCollection);
        }
    },
    methods : {
        updateLobbyList(){
            this.$socket.emit('update_lobby_list');
        },
        getAllPlayer(){
            this.$socket.emit('get_player_list');            
        },
        getGameCollection(){
            this.$socket.emit('get_game_collection');
        }
    }
}