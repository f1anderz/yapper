import {createRouter, createWebHistory} from 'vue-router';
import NotFoundView from '@/views/NotFoundView.vue';
import HomeView from '@/views/HomeView.vue';
import AuthView from '@/views/AuthView.vue';
import {useUserStore} from '@/stores/user.js';
import {inject} from 'vue';
import ProfileView from '@/views/ProfileView.vue';

const router = createRouter({
    history: createWebHistory(), routes: [{
        path: '/', name: 'Home', component: HomeView
    }, {
        path: '/auth', name: 'Authentication', component: AuthView
    }, {
        path: '/profile', name: 'Profile', component: ProfileView
    }, {
        path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundView
    }]
});

router.beforeEach((to, from, next) => {
    const userStore = useUserStore();
    const cookies = inject('$cookies');
    if (cookies.isKey('user')) {
        userStore._id = cookies.get('user')._id;
        userStore.nickname = cookies.get('user').nickname;
    }
    if (to.name !== 'Authentication' && !userStore.isAuthenticated) next({name: 'Authentication'}); else next();
});

router.beforeEach((to, from, next) => {
    const userStore = useUserStore();
    if(to.name === 'Authentication' && userStore.isAuthenticated) next({name: 'Home'}); else next();
});

export default router;