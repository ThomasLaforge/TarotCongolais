import VueSocketio from 'vue-socket.io';
Vue.use(VueSocketio, 'http://localhost:8080');

import { board } from '../vue/board' 
import { connection } from '../vue/connection' 

const routes = [
  { path: '/', component: board },
  { path: '/login', component: connection },
  { path: '/board', component: board }
]

const router = new VueRouter({
  routes
})

let app = new Vue({
    el: '#app',
		router,
});