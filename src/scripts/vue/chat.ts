import {ChatLine} from '../modules/TarotCongolais'

let template = `
<div class="chat-zone">
    <h2>Chat</h2>
    <div class="chat">
        <p v-for="chatLine in chatHistory">{{ chatLine.pseudo }} : {{ chatLine.msg }}</p>
    </div>
    <div class="chat-new-msg">
        <input type="text" v-model="newMessage" />
        <button @click="sendMsg">Send</button>
    </div>
</div>
`

export const chat = {
    template : template,
    data: function(){
        return {
            chatHistory: [],
            newMessage: ''
        }
    },
    sockets : {
        updatechat : function(chatLine : ChatLine){
            this.chatHistory.push(chatLine);
        },
        new_player(pseudo){
            this.chatHistory.push({ pseudo : 'Admin', msg: 'Un nouveau joueur vient de rentrer à la table : ' + pseudo})    
        }
    },
    methods : {
        sendMsg : function(){
            this.$socket.emit('new_message', this.newMessage);
            this.newMessage = ''
        }
    }
}