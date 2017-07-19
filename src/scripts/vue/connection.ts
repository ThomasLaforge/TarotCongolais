import { board } from './board'
import { GameState } from '../modules/TarotCongolais'

let template = `
<div>
    <h2>Connexion</h2>

    <input type="text" v-model="pseudo" />
    <button @click="register">Connexion</button>
</div>
`

export const connection = {
    template : template,
    data: function(){
        return {
            pseudo: ''
        }
    },
    components : {
        board
    },
    sockets: {
        pseudo_already_used(){
            console.log('pseudo already used')
        },
        player_added(){
            this.$router.push({path: '/lobby'});
        }
    },
    methods: {
        register(){
            if(this.pseudo !== ''){
                this.$socket.emit('register', this.pseudo)
            }
            else{
                console.log('Err : pseudo is empty')
            }
        }
    }
}