const express = require('express');
const router = express.Router();

router.get('/ui', (req, res) => {
    res.render('photo')
});


module.exports = router;