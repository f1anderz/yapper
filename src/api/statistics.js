import axios from 'axios';

const base_url = 'https://www.yapper.space:3000/stats';

export default {
    async get_stats() {
        return await axios.get(base_url);
    }, async get_user_stats(userId) {
        return await axios.get(base_url + `/${userId}`);
    }
};