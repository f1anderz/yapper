import axios from 'axios';
import {useUserStore} from '@/stores/user.js';

const base_url = 'https://www.yapper.space:3000/yaps';

export default {
    async get_yaps() {
        const userStore = useUserStore();
        const authorization = `Bearer ${userStore.token}`;
        return await axios.get(base_url, {headers: {'Authorization': authorization}});
    },
    async get_random_yap(yapId) {
        const userStore = useUserStore();
        const authorization = `Bearer ${userStore.token}`;
        return await axios.get(base_url + `/random/${yapId}`, {headers: {'Authorization': authorization}});
    }, async get_yap(yapId) {
        const userStore = useUserStore();
        const authorization = `Bearer ${userStore.token}`;
        return await axios.get(base_url + `/${yapId}`, {headers: {'Authorization': authorization}});
    }, async get_victim_yaps(getData) {
        const userStore = useUserStore();
        const authorization = `Bearer ${userStore.token}`;
        return await axios.get(base_url + `/victim/${getData.userId}`, {headers: {'Authorization': authorization}});
    }, async get_author_yaps(getData) {
        const userStore = useUserStore();
        const authorization = `Bearer ${userStore.token}`;
        return await axios.get(base_url + `/author/${getData.userId}`,{headers: {'Authorization': authorization}});
    }, async trigger_like(patchData) {
        const userStore = useUserStore();
        const authorization = `Bearer ${userStore.token}`;
        return await axios.patch(base_url + `/like/${patchData.yapId}`, {
            userId: patchData.userId
        },{headers: {'Authorization': authorization}});
    }, async post_yap(postData) {
        const userStore = useUserStore();
        const authorization = `Bearer ${userStore.token}`;
        return await axios.post(base_url, {
            author: postData.author,
            victim: postData.victim,
            body: postData.body,
            deathTime: postData.deathTime
        },{headers: {'Authorization': authorization}});
    }, async delete_yap(yapId) {
        const userStore = useUserStore();
        const authorization = `Bearer ${userStore.token}`;
        return await axios.delete(base_url + `/${yapId}`,{headers: {'Authorization': authorization}});
    }, async update_yap({yapId, body, deathTime}) {
        const userStore = useUserStore();
        const authorization = `Bearer ${userStore.token}`;
        return await axios.patch(base_url + `/${yapId}`, {
            body: body,
            deathTime: deathTime
        },{headers: {'Authorization': authorization}});
    }
};