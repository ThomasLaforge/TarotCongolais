import { chat } from './chat'
import { VueLobbyData, LobbyListElt } from '../modules/TarotCongolais'
let template = `
<div>
    <h2>Lobby</h2>

    <button @click="auto">Auto find game</button>

    <div class="game-list">
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Occupation</th>
                </tr>
            </thead>
            
            <tbody>
                <tr class="game-list-elt " :class="selectedGameRoomId === game.name ? 'game-list-elt-selected' : 'game-list-elt-not-selected' " v-for="game in gameList" @click="selectGame(game.name)">
                    <td>{{ game.name }}</td>
                    <td>{{ game.playerOn }} / {{ game.maxPlayers }}</td>
                </tr>
            </tbody>
        </table>
    </div>
    <button @click="create">Create</button>
    <button @click="join">Join</button>

    <chat socketActionSendMessage="new_lobby_message" />
</div>
`

export const lobby = {
    template : template,
    data: function() : VueLobbyData {
        return {
            selectedGameRoomId: null,
            gameList : [{
                name : 'game 2',
                maxPlayers : 4,
                playerOn : 2
            }]
        }
    },
    components: {
        chat
    },
    sockets: {
        enter_gameroom(gameRoomId:string){
            this.$router.push({path: '/board/' + gameRoomId });
        },
        update_lobby_list(list: Array<LobbyListElt>){
            console.log('update_list', list)
            this.gameList = list;
        }
        
    },
    methods: {
        auto(){
            this.$socket.emit('lobby-auto')
        },
        create(){
            this.$socket.emit('lobby-create')
        },
        join(){
            if(this.selectedGameRoomId){
                this.$socket.emit('lobby-join', this.selectedGameRoomId)
            }
        },
        update(){
            this.$socket.emit('update_lobby_list');
        },
        selectGame(gameRoomId: string){
            console.log('select gameRoomId', gameRoomId)
            if(this.selectedGameRoomId === gameRoomId){
                this.selectedGameRoomId = null
            }
            else{
                this.selectedGameRoomId = gameRoomId
            }
        },
    },
    mounted: function(){
        this.$socket.emit('isLoggedIn')
        this.update();
    }
}