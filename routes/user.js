const router = require('express').Router(),
    userApi = require('../api/user/');

router.post('/api/user', function (req, res) {
    userApi.create(req).then(function (response) {
        res.send(response);
    });
});

router.put('/api/user', function (req, res) {
    userApi.update(req).then(function (response) {
        res.send(JSON.stringify(response));
    });
});

router.get('/api/user', function (req, res) {
    userApi.searchQuery(req).then(function (response) {
        res.send(JSON.stringify(response));
    });
});

module.exports = router;