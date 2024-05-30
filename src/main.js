import {createApp} from 'vue';
import App from './App.vue';
import {createPinia} from 'pinia';
import router from '@/router/index.js';
import cookies from 'vue-cookies';
import vue3GoogleLogin from 'vue3-google-login';
import ClickOutside from '@/directives/ClickOutsideDirective.js';

const pinia = createPinia();
createApp(App)
    .use(pinia)
    .use(cookies)
    .use(router)
    .directive('click-outside', ClickOutside)
    .use(vue3GoogleLogin, {
        clientId: '382042174098-nhb02ht8ccndp0jcc0ji1ic44v655o0q.apps.googleusercontent.com'
    })
    .mount('#app');