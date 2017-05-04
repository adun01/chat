const router = require('express').Router(),
    userApi = require('../api/user/');

router.post('/api/registration', function (req, res) {
    userApi.create(req).then(function (response) {
        res.send(response);
    });
});

module.exports = router;