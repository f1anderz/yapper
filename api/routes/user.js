const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

const checkAuth = require('../middleware/check-auth');

router.get('/github/getToken', userController.github_get_token);

router.get('/github/getUserData', userController.github_get_user_data);

router.get('/:id', checkAuth, userController.get_user);

router.get('/', checkAuth, userController.get_users);

router.post('/register', userController.users_register);

router.post('/login', userController.users_login);

router.post('/auth', userController.users_auth);

module.exports = router;