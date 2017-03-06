// import {port} from '../server/app'
import VueSocketio from 'vue-socket.io';
Vue.use(VueSocketio, 'http://localhost:8080');

// import * as Vue from 'vue'
// import * as VueRouter from 'vue-router'

import { board } from '../vue/board' 
import { connection } from '../vue/connection' 

const routes = [
  { path: '/', component: connection },
  { path: '/login', component: connection },
  { path: '/board', component: board }
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
		}
});