const router = require('express').Router(),
    roomApi = require('../api/room/');

router.get('/api/room', function (req, res) {
    roomApi.get(req.query.id, req.session.user.id).then(function (result) {
        res.send(JSON.stringify({list: result}));
    });
});

router.post('/api/room', function (req, res) {
    roomApi.create(req.body, req.session.user.id).then(function (response) {
        res.send(JSON.stringify({room: response}));
    });
});

module.exports = router;