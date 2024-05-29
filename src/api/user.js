import axios from 'axios';

const base_url = 'http://18.130.224.237:3000/users';

export default {
    async get_users() {
        return await axios.get(base_url);
    }, async login(loginData) {
        return await axios.post(base_url + '/login', {
            login: loginData.login,
            password: loginData.password
        });
    }, async google_login(loginData) {
        return await axios.post(base_url + '/login', {
            googleId: loginData.googleId
        });
    }, async register(registerData) {
        return await axios.post(base_url + '/register', {
            login: registerData.login,
            nickname: registerData.nickname,
            password: registerData.password
        });
    }, async google_register(registerData) {
        return await axios.post(base_url + '/register', {
            nickname: registerData.nickname,
            googleId: registerData.sub
        });
    }, async linkedin_register(registerData) {
        return await axios.get(base_url + '/register');
    }
};