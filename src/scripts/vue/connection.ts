let template = `
<div>
    <h2>Connexion</h2>

    <input type="text" v-model="pseudo" />
    <button @click="registerPseudo(pseudo)">Connexion</button>
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
            this.$router.push({path: '/board'});  
        }
    },
    methods: {
        registerPseudo(pseudo: string){
            console.log('set pseudo : ', pseudo)
            if(pseudo !== ''){
                this.$socket.emit('set_pseudo', pseudo)
            }
            else{
                console.log('Err : pseudo is empty')
            }
        }
    }
}