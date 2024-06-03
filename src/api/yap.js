import axios from 'axios';

const base_url = 'https://www.yapper.space:3000/yaps';

export default {
    async get_yaps() {
        return await axios.get(base_url);
    },
    async get_random_yap(yapId) {
        return await axios.get(base_url + `/random/${yapId}`);
    }, async get_yap(yapId) {
        return await axios.get(base_url + `/${yapId}`);
    }, async get_victim_yaps(getData) {
        return await axios.get(base_url + `/victim/${getData.userId}`);
    }, async get_author_yaps(getData) {
        return await axios.get(base_url + `/author/${getData.userId}`);
    }, async trigger_like(patchData) {
        return await axios.patch(base_url + `/like/${patchData.yapId}`, {
            userId: patchData.userId
        });
    }, async post_yap(postData) {
        return await axios.post(base_url, {
            author: postData.author,
            victim: postData.victim,
            body: postData.body,
            deathTime: postData.deathTime
        });
    }, async delete_yap(yapId) {
        return await axios.delete(base_url + `/${yapId}`);
    }, async update_yap({yapId, body, deathTime}) {
        return await axios.patch(base_url + `/${yapId}`, {
            body: body,
            deathTime: deathTime
        });
    }
};