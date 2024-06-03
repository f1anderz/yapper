import axios from 'axios';
import {useUserStore} from '@/stores/user.js';

const base_url = 'https://www.yapper.space:3000/stats';

export default {
    async get_stats() {
        const userStore = useUserStore();
        const authorization = `Bearer ${userStore.token}`;
        return await axios.get(base_url, {headers: {'Authorization': authorization}});
    }, async get_user_stats(userId) {
        const userStore = useUserStore();
        const authorization = `Bearer ${userStore.token}`;
        return await axios.get(base_url + `/${userId}`,{headers: {'Authorization': authorization}});
    }
};