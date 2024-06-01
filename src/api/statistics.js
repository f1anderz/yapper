import axios from 'axios';

const base_url = 'http://localhost:3000/stats';

export default {
    async get_stats() {
        return await axios.get(base_url);
    }
};