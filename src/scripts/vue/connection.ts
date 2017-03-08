let template = `
<div>
    <h2>Connexion</h2>

    <input type="text" v-model="pseudo" />
    <button @click="registerPseudo(pseudo)">Connexion</button>
    <button @click="getAllPseudo">Server log all pseudo</button>
</div>
`

export const connection = {
    template : template,
    data: function(){
        return {
            pseudo: ''
        }
    },
    sockets: {
        game_is_already_full(){
            console.log('sorry but game is already full')
            alert('game is already full');
        },
        pseudo_accepted(){
            console.log('pseudo accepted')
            this.$router.push({path: '/lobby'});  
        },
        player_added(){
            this.$router.push({path: '/lobby'});
        }
    },
    methods: {
        registerPseudo(pseudo: string){
            console.log('connect : ', pseudo)
            if(pseudo !== ''){
                this.$socket.emit('register', pseudo)
            }
            else{
                console.log('Err : pseudo is empty')
            }
        },
        getAllPseudo(){
            this.$socket.emit('log-pseudo-list')
        }
    }
}