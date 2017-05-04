const router = require('express').Router(),
    authApi = require('../api/auth/');

router.post('/api/auth', function (req, res) {
    authApi.logIn(req).then(function (response) {
        res.send(response);
    });
});

router.get('/api/auth', function (req, res) {
    authApi.isAuth(req).then(function (response) {
        if (!response.user) {
            response.success = false;
        }
        res.send(response);
    });
});

module.exports = router;