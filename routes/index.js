const router = require('express').Router(),
    path = require('path');

router.get('/*', function (req, res, next) {
    res.render('../views/index.html');
});

module.exports = router;