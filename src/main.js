import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import './styles/main.css'; // Optional in case style centralisation is needed

createApp(App).use(router).mount('#app');
