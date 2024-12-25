const express = require('express');
const router = express.Router();
const comment_controller = require('../controllers/comment_controller');

router.post('/addComment/:post_id', comment_controller.addComments);

module.exports = router;