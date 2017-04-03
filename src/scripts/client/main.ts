import {port} from '../server/app'
import VueSocketio from 'vue-socket.io';
// Vue.use(VueSocketio, 'http://192.168.0.28:8080');
Vue.use(VueSocketio, 'http://localhost:' + port);

// import * as Vue from 'vue'
// import * as VueRouter from 'vue-router'

import { board } from '../vue/board' 
import { connection } from '../vue/connection' 
import { lobby } from '../vue/lobby' 

const routes = [
  { path: '/', component: connection },
  { path: '/login', component: connection },
  { path: '/board', component: board },
  { path: '/lobby', component: lobby },
]

const router = new VueRouter({
  routes
})

let app = new Vue({
    el: '#app',
		router,
		sockets:{
      isLoggedIn(isOnGame: boolean){
        if(!isOnGame){
            this.$router.push({path: '/login'});  
        }
      }
		}
});