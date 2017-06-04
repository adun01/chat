const router = require('express').Router(),
    eventsMediator = require('../../events.mediator'),
    roomApi = require('../../api/room/');

router.get('/api/room/:id?/', async function (req, res) {

    let result = await roomApi.get({
        roomId: req.params.id,
        userId: req.session.user.id,
        search: req.query.search,
        query: req.query.query
    });

    res.send(JSON.stringify(result));
});

router.post('/api/room/', async function (req, res) {

    let roomCreateResult = await roomApi.create({
        name: req.body.name,
        public: req.body.public,
        user: req.session.user,
        userInvited: req.body.userInvited
    });

    if (roomCreateResult.success) {
        eventsMediator.emit('roomListChange', {
            userId: req.session.user.id
        });

        roomCreateResult.room.userInvited.forEach(function (userId) {
            eventsMediator.emit('newNotificationRoom', {
                roomId: +roomCreateResult.room.id,
                userId: +userId
            });
        });

    }

    res.send(JSON.stringify(roomCreateResult));
});

module.exports = router;