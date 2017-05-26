const router = require('express').Router(),
    eventsMediator = require('../../events.mediator'),
    userAgreed = require('../../api/room/room.userAgreed');
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

router.delete('/api/room/:id/userAgreed/', async function (req, res) {

    await userAgreed.remove({
        roomId: req.params.id,
        userId: req.session.user.id
    });

    await userInvited.remove({
        roomId: req.params.id,
        userId: req.session.user.id
    });

    eventsMediator.emit('userListChange', {
        roomId: req.params.id,
        userId: req.session.user.id
    });

    res.send(JSON.stringify({success: true}));
});

module.exports = router;