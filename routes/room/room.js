const router = require('express').Router(),
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
        user: req.session.user,
        userInvited: req.body.userInvited
    });

    res.send(JSON.stringify(roomCreateResult));
});

module.exports = router;