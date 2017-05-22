const router = require('express').Router(),
    socketEvents = require('../socketEvents'),
    eventsMediator = require('../events.mediator'),
    userApi = require('../api/user/'),
    messageApi = require('../api/message/');

router.get('/api/room/:id/message', function (req, res) {
    messageApi.get({
        roomId: +req.params.id,
        creatorId: +req.session.user.id
    }).then(function (result) {
        res.send(JSON.stringify(result));
    });

});

router.post('/api/room/:id/message', function (req, res) {
    messageApi.add({
        creatorId: req.session.user.id,
        message: req.body.message,
        roomId: req.body.id
    }).then(function (result) {
        eventsMediator.emit('newMessage', {
            message: result.message,
            roomId: req.body.id,
            userId: req.session.user.id
        });

        res.send(JSON.stringify(result));
    });

});

module.exports = router;