import VueSocketio from 'vue-socket.io';
Vue.use(VueSocketio, 'http://localhost:8080');

const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }

const routes = [
  { path: '/', component: Foo },
  { path: '/login', component: Foo },
  { path: '/board', component: Bar }
]

const router = new VueRouter({
  routes
})

let app = new Vue({
    el: '#app',
	router,
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