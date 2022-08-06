import { createApp } from 'vue';
import App from './App.vue';
import Maska from 'maska';
import { createRouter, createWebHistory} from 'vue-router';
import './assets/main.css';
import store from './store';
import Chat from './pages/Chat.vue'


const routes = [
    { path:'/', component:Chat},
    { path:'/:hash', component:Chat}
];

const router = createRouter({history:createWebHistory(), routes});

const app = createApp(App);
app.use(store);
app.use(router);
app.use(Maska);
app.mount('#app');
