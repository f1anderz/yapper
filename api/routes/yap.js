const express = require('express');
const router = express.Router();
const yapController = require('../controllers/yap');

const checkAuth = require('../middleware/check-auth');

router.post('/', checkAuth, yapController.create_yap);

router.get('/random/:prevId', checkAuth, yapController.get_random_yap);

router.get('/victim/:userId', checkAuth, yapController.get_victim_yaps);

router.get('/author/:userId', checkAuth, yapController.get_author_yaps);

router.get('/:id', checkAuth, yapController.get_yap);

router.get('/', checkAuth, yapController.get_all_yaps);

router.patch('/like/:id', checkAuth, yapController.like_yap);

router.patch('/:id', checkAuth, yapController.modify_yap);

router.delete('/:id', checkAuth, yapController.delete_yap);

module.exports = router;