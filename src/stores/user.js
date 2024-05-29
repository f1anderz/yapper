import {defineStore} from 'pinia';

export const useUserStore = defineStore('user', {
    state: () => ({
        _id: null,
        nickname: null
    }), getters: {
        isAuthenticated: (state) => {
            return state._id !== null;
        }
    }, actions: {

    }
});