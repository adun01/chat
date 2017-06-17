const router = require('express').Router(),
    eventPublish = require('../../eventPublish'),
    messageApi = require('../../api/room/message');

router.get('/api/room/:roomId/message', async(req, res) => {

    let seachMessagesResult = await messageApi.get(
        +req.params.roomId,
        req.session.user.id
    );

    res.send(JSON.stringify(seachMessagesResult));

});

router.post('/api/room/:roomId/message', async(req, res) => {

    let newMessageResult = await messageApi.add(
        req.session.user.id,
        +req.params.roomId,
        req.body.message
    );

    if (newMessageResult.success) {
        //eventPublish
    }

    res.send(JSON.stringify(newMessageResult));
});

module.exports = router;