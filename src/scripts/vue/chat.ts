import {ChatLine} from '../modules/TarotCongolais'

let template = `
<div class="chat-zone">
    <h2>Chat</h2>
    <div class="chat">
        <div class="chat-line" v-for="chatLine in chatHistory">
            <div class="chat-line-pseudo">{{ chatLine.pseudo }} : </div>
            <div class="chat-line-message">{{ chatLine.msg }}</div>
        </div>
    </div>
    <div class="chat-new-msg">
        <input class="chat-new-msg-input" type="text" v-model="newMessage" />
        <button class="chat-new-msg-button" @click="sendMsg">Send</button>
    </div>
</div>
`

export const chat = {
    template : template,
    props: ['socketActionSendMessage'],
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
            this.$socket.emit(this.socketActionSendMessage, this.newMessage);
            this.newMessage = ''
        }
    }
}