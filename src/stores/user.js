import {defineStore} from 'pinia';

export const useUserStore = defineStore('user', {
    state: () => ({
        user: {_id: null},
        token: null
    }), getters: {
        isAuthenticated: (state) => {
            return state.user._id !== null;
        }
    }, actions: {}
});