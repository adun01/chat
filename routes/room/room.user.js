const router = require('express').Router(),
    eventsApi = require('../../eventPublish'),
    roomApi = require('../../api/room/');

router.get('/api/room/:roomId/user/', async(req, res) => {

    let resGetUser = await roomApi.getUser(+req.params.roomId);
    res.send(JSON.stringify(resGetUser));
});

router.post('/api/room/:roomId/user/', async(req, res) => {

    let resAddUser = await roomApi.addUser(+req.params.roomId, req.session.user.id);

    res.send(JSON.stringify(resAddUser));
});

//unban
router.post('/api/room/:roomId/user/userUnbanned', async(req, res) => {

    let resAddUser = await roomApi.addUser(+req.params.roomId, req.session.user.id);

    res.send(JSON.stringify(resAddUser));
});

router.delete('/api/room/:roomId/user/', async(req, res) => {

    let resRemoveUser = await roomApi.removeUser(
        +req.params.roomId,
        req.session.user.id,
        +req.params.userDeleteId
    );

    res.send(JSON.stringify(resRemoveUser));
});

// ban
router.delete('/api/room/:roomId/user/:userBanned', async(req, res) => {

    let resBannedUser = await roomApi.bannedUser(
        +req.params.roomId,
        req.session.user.id,
        +req.params.userBanned
    );

    eventsApi.emit('banned', {
        creaotorId: req.session.user.id,
        roomId: +req.params.roomId,
        userId: +req.params.userBanned
    });

    res.send(JSON.stringify(resBannedUser));
});

module.exports = router;