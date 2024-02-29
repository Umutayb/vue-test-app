import { createApp } from "vue";
import App from "./App.vue";
import router from './router';
import './styles/main.css'; // Optional in case style centralisation is needed
import mitt from 'mitt';

const emitter = mitt();
  
const app = createApp(App)
    .use(router)

app.config.globalProperties.emitter = emitter;
router.isReady().then(() => app.mount("#app"));
