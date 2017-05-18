const router = require('express').Router(),
    roomNotificationApi = require('../api/notification/room.notification');

router.get('/api/notification/room', function (req, res) {
    roomNotificationApi.get({id: req.session.user.id}).then(function (rooms) {
        res.send(JSON.stringify({success: true, rooms: rooms}));
    });
});

router.post('/api/notification/room', function (req, res) {
    roomNotificationApi.save(req.body.id, req.session.user.id).then(function (result) {
        res.send(JSON.stringify(result));
    });
});

router.delete('/api/notification/room', function (req, res) {
    roomNotificationApi.remove(req.query.id, req.session.user.id).then(function (result) {
        res.send(JSON.stringify(result));
    });
});

module.exports = router;