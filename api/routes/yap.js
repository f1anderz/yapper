const express = require('express');
const router = express.Router();
const yapController = require('../controllers/yap');

router.post('/', yapController.create_yap);

router.get('/', yapController.get_all_yaps);

router.get('/random/:prevId', yapController.get_random_yap);

router.get('/victim/:userId', yapController.get_victim_yaps);

router.get('/author/:userId', yapController.get_author_yaps);

router.get('/:id', yapController.get_yap);

router.patch('/like/:id', yapController.like_yap);

router.patch('/:id', yapController.modify_yap);

router.delete('/', yapController.delete_yap);

module.exports = router;