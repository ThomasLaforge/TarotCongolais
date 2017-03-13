import { chat } from './chat'

let template = `
<div>
    <h2>Lobby</h2>

    <button @click="auto">Auto find game</button>

    <div class="game-list">
        <table>
            <thead>
                <tr>name</th>
                <tr>occupation</th>
            </thead>
            
            <tbody>
                <tr class="game-list-elt" v-for="game in gameList">
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
    data: function(){
        return {
            selectedGame: null,
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

    },
    methods: {
        auto(){
            this.$socket.emit('lobby-auto')
        },
        create(){
            this.$socket.emit('lobby-create')
        },
        join(){
            if(this.selectedGame){
                this.$socket.emit('lobby-join', this.selectedGame)
            }
        }
    },
    mounted: function(){
        this.$socket.emit('is_logged_in')
    }
}