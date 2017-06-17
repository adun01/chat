const router = require('express').Router(),
    eventPublish = require('../../eventPublish'),
    roomApi = require('../../api/room/');

router.get('/api/room/:roomId/message', async(req, res) => {

    let seachMessagesResult = await roomApi.getMessage(
        +req.params.roomId,
        req.session.user.id
    );

    res.send(JSON.stringify(seachMessagesResult));

});

router.post('/api/room/:roomId/message', async(req, res) => {

    let newMessageResult = await roomApi.addMessage(
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