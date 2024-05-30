const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router.get('/github/getToken', userController.github_get_token);

router.get('/github/getUserData', userController.github_get_user_data);

router.get('/:id', userController.get_user);

router.get('/', userController.get_users);

router.post('/register', userController.users_register);

router.post('/login', userController.users_login);

router.post('/auth', userController.users_auth);

module.exports = router;