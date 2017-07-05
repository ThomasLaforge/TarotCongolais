import {port} from '../modules/Config'
import VueSocketio from 'vue-socket.io';
// Vue.use(VueSocketio, 'http://192.168.0.28:8080');
Vue.use(VueSocketio, 'http://localhost:' + port);

// import * as Vue from 'vue'
// import * as VueRouter from 'vue-router'

import { board } from '../vue/board' 
import { connection } from '../vue/connection' 
import { lobby } from '../vue/lobby' 
import { toolbox } from '../vue/toolbox' 

const routes = [
  { path: '/', component: connection },
  { path: '/login', component: connection },
  { path: '/board/:gameroomid', component: board, props: true },
  { path: '/lobby', component: lobby },
]

const router = new VueRouter({
  routes
})

let app = new Vue({
    el: '#app',
    components : {
        toolbox
    },
		router,
		sockets:{
      isLoggedIn(isLoggedIn: boolean){
        console.log('is Logged in', isLoggedIn)
        if(!isLoggedIn){
            this.$router.push({path: '/login'});  
        }
      }
		}
});