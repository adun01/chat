const router = require('express').Router(),
    roomApi = require('../api/room/');

router.get('/api/room', function (req, res) {
    roomApi.get(req.query.id, req.session.user.id).then(function (result) {
        res.send(JSON.stringify({list: result}));
    });
});

module.exports = router;