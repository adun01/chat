const router = require('express').Router(),
    eventsMediator = require('../../events.mediator'),
    userAgreed = require('../../api/room/room.userAgreed'),
    userInvited = require('../../api/room/room.userInvited');

router.post('/api/room/:id/userAgreed/', async function (req, res) {

    let insertResult = await userAgreed.add({
        roomId: req.params.id,
        userId: req.session.user.id
    });

    if (insertResult.alert) {

        eventsMediator.emit('userListChange', {
            roomId: +req.params.id,
            userId: req.session.user.id
        });
    }

    res.send(JSON.stringify(insertResult));
});

router.get('/api/room/:id/userAgreed/', async function (req, res) {

    let insertResult = await userAgreed.get({
        roomId: req.params.id,
        userId: req.session.user.id
    });

    res.send(JSON.stringify(insertResult));
});

router.delete('/api/room/:roomId/userAgreed/:userId', async function (req, res) {

    let removeAgreed = await userAgreed.remove({
        roomId: +req.params.roomId,
        userId: req.session.user.id,
        userDeleted: +req.params.userId
    });

    let removeInvited = await userInvited.remove({
        roomId: +req.params.roomId,
        userId: req.session.user.id,
        userDeleted: +req.params.userId
    });

    if (!removeAgreed.success) {
        return res.send(JSON.stringify(removeAgreed));
    }

    if (!removeInvited.success) {
        return res.send(JSON.stringify(removeInvited));
    }

    eventsMediator.emit('userListChange', {
        roomId: +req.params.roomId
    });

    eventsMediator.emit('roomListChange', {
        userId: +req.params.userId
    });

    eventsMediator.emit('roomListChangeRemove', {
        userId: +req.params.userId,
        roomId: +req.params.roomId
    });

    res.send(JSON.stringify({success: true}));
});

module.exports = router;