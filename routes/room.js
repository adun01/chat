const router = require('express').Router(),
    userAgreedApi = require('../api/room/room.userAgreed'),
    roomApi = require('../api/room/');

router.get('/api/room', function (req, res) {
    roomApi.get(req.query.id, req.session.user.id).then(function (result) {
        if (result.list) {
            res.send(JSON.stringify(result));
        } else {
            res.send(JSON.stringify(result));
        }
    });
});

router.get('/api/room/userAgreed', function (req, res) {
    userAgreedApi.get({id: req.query.id}).then(function (response) {
        res.send(JSON.stringify(response));
    });
});

router.post('/api/room', function (req, res) {
    roomApi.create(req.body, req.session.user.id).then(function (response) {
        res.send(JSON.stringify({room: response}));
    });
});

module.exports = router;