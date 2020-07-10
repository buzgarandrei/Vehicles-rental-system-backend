const express = require('express');
const router = express.Router();

router.get('/branza', (req, res) => {
    res.send('We are on Branza endpoint');
});

module.exports = router;