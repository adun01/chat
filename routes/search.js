const router = require('express').Router(),
    userApi = require('../api/user/'),
    roomApi = require('../api/room/');

router.get('/api/search?:query', async(req, res) => {

    let result = {
            success: true,
            collection: []
        },

        userSearch = await userApi.query({query: req.query.query}),
        roomSearch = await roomApi.query({query: req.query.query}),
        users, rooms;

    users = userSearch.users.map(user => {
        user.room = false;
        return user;
    });

    rooms = roomSearch.rooms.map(room => {
        room.room = true;
        return room;
    });

    result.collection.push(...users, ...rooms);

    res.send(JSON.stringify(result));
});

module.exports = router;