import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import './styles/main.css'; // Optional in case style centralisation is needed
import mitt from 'mitt';

const emitter = mitt();
const app = createApp(App);

app.config.globalProperties.emitter = emitter;
app.use(router);
app.mount('#app');
