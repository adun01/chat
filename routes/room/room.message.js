const router = require('express').Router(),
    eventsMediator = require('../../events.mediator'),
    messageApi = require('../../api/message/room.message');

router.get('/api/room/:roomId/message', async function (req, res) {
    let seacrMessagesResult = await messageApi.get({
        roomId: +req.params.roomId,
        userId: +req.session.user.id
    });

    res.send(JSON.stringify(seacrMessagesResult));

});

router.post('/api/room/:roomId/message', async function (req, res) {

    let newMessageResult = await messageApi.add({
        userId: req.session.user.id,
        message: req.body.message,
        roomId: +req.params.roomId
    });

    eventsMediator.emit('newMessageRoom', {
        message: newMessageResult.message,
        roomId: +req.params.roomId,
        userIds: newMessageResult.userIds,
        userId: req.session.user.id
    });

    eventsMediator.emit('newNotificationRoomMessage', {
        userIds: newMessageResult.userIds,
        userId: req.session.user.id,
        roomId: +req.params.roomId
    });

    res.send(JSON.stringify(newMessageResult));


});

module.exports = router;