const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router.get('/', userController.get_users);

router.get('/:id', userController.get_user);

router.post('/register', userController.users_register);

router.post('/login', userController.users_login);

module.exports = router;