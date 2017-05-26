const router = require('express').Router(),
    eventsMediator = require('../../events.mediator'),
    userInvited = require('../../api/room/room.userInvited');

router.post('/api/room/:roomId/userInvited/:userId/', async function (req, res) {

    let addResult = await userInvited.add({
        roomId: +req.params.roomId,
        userId: req.session.user.id,
        addedUserId: +req.params.userId
    });

    if (addResult.alert) {
        eventsMediator.emit('newNotificationRoom', {
            roomId: +req.params.roomId,
            userId: +req.params.userId
        });
    }

    res.send(JSON.stringify(addResult));
});

router.delete('/api/room/:id/userInvited/', async function (req, res) {

    let removeResult = await userInvited.remove({
        roomId: +req.params.id,
        userId: req.session.user.id
    });

    res.send(JSON.stringify(removeResult));
});

module.exports = router;