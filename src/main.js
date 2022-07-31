import { createApp } from 'vue';
import App from './App.vue';
import Maska from 'maska';

import './assets/main.css';
import store from './store';

const app = createApp(App)
app.use(store)
app.use(Maska)
app.mount('#app')
