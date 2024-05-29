import {createApp} from 'vue';
import App from './App.vue';
import {createPinia} from 'pinia';
import router from '@/router/index.js';
import cookies from 'vue-cookies';

const pinia = createPinia();
createApp(App)
    .use(pinia)
    .use(cookies)
    .use(router)
    .mount('#app');