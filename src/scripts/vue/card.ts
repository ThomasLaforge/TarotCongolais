let template = `
<div class="card">
    {{ value }}
</div>
`

export const card = {
    template : template,
    props : ['value'],
    data(){
        return {
        }
    },
    computed : {
    },
    components: {
    },
    sockets: {
        // enter_gameroom(gameRoomId:string){
        //     this.$router.push({path: '/board/' + gameRoomId });
        // }
    },
    methods: {
        // auto(){
        //     this.$socket.emit('lobby-auto')
        // }
    }
}