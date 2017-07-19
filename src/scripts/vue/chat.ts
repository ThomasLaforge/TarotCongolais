import {ChatLine, ChatType, VueChatData} from '../modules/TarotCongolais'

let template = `
<div class="chat-zone">
    <h2>Chat</h2>
    <div class="chat">
        <div class="chat-line" v-for="chatLine in chatHistory">
            <div class="chat-line-pseudo">{{ chatLine.pseudo }} :&nbsp;</div>
            <div class="chat-line-message">{{ chatLine.msg }}</div>
        </div>
    </div>
    <div class="chat-form-msg">
        <input class="chat-new-msg-input" type="text" v-model="newMessage" />
        <button class="chat-new-msg-button" @click="sendMsg">Send</button>
    </div>
</div>
`

export const chat = {
    template : template,
    props: ['socketActionSendMessage', 'type'],
    data: function(): VueChatData{
        return {
            chatHistory: [],
            newMessage: ''
        }
    },
    sockets : {
        update_chat(chatLine : ChatLine){
            if(chatLine.chatType === this.type){
                this.chatHistory.push(chatLine);
            }
        },
        player_connected(pseudo: string){
            if(this.type === ChatType.Lobby){
                this.chatHistory.push({ pseudo : 'Admin', msg: 'Un nouveau joueur vient de se connecter : ' + pseudo})    
            }
        },
        new_player(pseudo: string){
            if(this.type === ChatType.Game)
            this.chatHistory.push({ pseudo : 'Admin', msg: 'Un nouveau joueur vient de rejoindre la partie : ' + pseudo})                
        }
    },
    methods : {
        sendMsg : function(){
            this.$socket.emit(this.socketActionSendMessage, this.newMessage);
            this.newMessage = ''
        }
    }
}