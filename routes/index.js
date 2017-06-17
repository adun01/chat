const router = require('express').Router(),
    path = require('path');

router.get('/*', (req, res) => {
    res.render('../views/index.html');
});

module.exports = router;