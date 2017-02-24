import VueSocketio from 'vue-socket.io';
Vue.use(VueSocketio, 'http://localhost:8080');

let app = new Vue({
    el: '#app',
	sockets:{
		connect: function(){
			console.log('socket connected', 'Thomas')
			this.$socket.emit('adduser', 'Thomas')
    	},
		test: function(msg: string){
			console.log('test from server', msg)
		}
	},
	methods: {
		clickButton: function(val){
			// $socket is socket.io-client instance
			console.log('click')
			this.$socket.emit('getinfogame', val);
		}
	}
});