import axios from 'axios';

const base_url = 'http://localhost:3000/yaps';

export default {
    async get_yaps() {
        return await axios.get(base_url);
    },
    async get_random_yap(yapId) {
        return await axios.get(base_url + '/random/' + yapId);
    }, async get_yap(yapId) {
        return await axios.get(base_url + '/' + yapId);
    }, async get_victim_yap(getData) {
        return await axios.get(base_url + '/victim/' + getData.userId);
    }, async trigger_like(patchData) {
        return await axios.patch(base_url + '/like/' + patchData.yapId, {
            userId: patchData.userId
        });
    }, async post_yap(postData) {
        return await axios.post(base_url, {
            author: postData.author,
            victim: postData.victim,
            body: postData.body,
            deathTime: postData.deathTime
        });
    }
};