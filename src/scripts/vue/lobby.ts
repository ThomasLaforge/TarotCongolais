let template = `
<div>
    <h2>Lobby</h2>

    <button @click="action">Auto find game</button>

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
    <button @click="action">Create</button>
    <button @click="action">Rejoindre</button>
</div>
`

export const lobby = {
    template : template,
    data: function(){
        return {
            gameList : [{
                name : 'game 1',
                maxPlayers : 4,
                playerOn : 2
            }]
        }
    },
    sockets: {

    },
    methods: {
        action(){
            console.log('click on lobby button')
        }
    }
}