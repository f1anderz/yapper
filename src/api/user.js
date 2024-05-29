import axios from 'axios';

const base_url = 'http://localhost:3000/users';

export default {
    async get_users() {
        return await axios.get(base_url);
    }, async login(loginData) {
        return await axios.post(base_url + '/login', {
            login: loginData.login,
            password: loginData.password
        });
    }, async register(registerData) {
        return await axios.post(base_url + '/register', {
            login: registerData.login,
            nickname: registerData.nickname,
            password: registerData.password
        });
    }
};