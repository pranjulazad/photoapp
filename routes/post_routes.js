const express = require('express');
const router = express.Router();
const post_controller = require('../controllers/post_controller');

router.get('/posts', post_controller.getPosts);

router.post('/posts', post_controller.addPosts);

module.exports = router;