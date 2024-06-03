import axios from 'axios';

const base_url = 'https://www.yapper.space:3000/users';

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
            name: registerData.name,
            password: registerData.password
        });
    }, async google_auth(registerData) {
        return await axios.post(base_url + '/auth', {
            name: registerData.name,
            login: registerData.login,
            googleId: registerData.sub
        });
    }, async github_auth(registerData) {
        return await axios.post(base_url + '/auth', {
            name: registerData.name,
            login: registerData.login,
            gitHubId: registerData.gitHubId
        });
    }, async github_get_token(code) {
        return await axios.get(base_url + `/github/getToken?code=${code}`);
    }, async github_get_user_data(token) {
        return await axios.get(base_url + `/github/getUserData?token=${token}`);
    }
};