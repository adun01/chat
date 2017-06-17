const router = require('express').Router(),
    conversationApi = require('../../api/conversation/'),
    roomApi = require('../../api/room/');

router.get('/api/room/:id/', async  (req, res) => {

    let result = await roomApi.get(
        +req.params.id,
        req.session.user.id
    );

    res.send(JSON.stringify(result));
});

router.get('/api/room/', async  (req, res) => {

    let result = {
            success: true,
            collection: []
        },

        conversationSearch = await conversationApi.get(req.session.user.id),
        roomSearch = await roomApi.get(null, req.session.user.id),
        conversations, rooms;

    conversations = conversationSearch.conversations;

    rooms = roomSearch.rooms;

    result.collection.push(...conversations, ...rooms);

    res.send(JSON.stringify(result));
});

router.post('/api/room/', async  (req, res) => {

    let roomCreateResult = await roomApi.create(
        req.body.name,
        req.session.user.id,
        req.body.userInvited
    );

    res.send(JSON.stringify(roomCreateResult));
});

module.exports = router;