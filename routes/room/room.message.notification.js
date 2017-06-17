const router = require('express').Router();

router.post('/api/room/:roomId/notification/message/:messageId', async (req, res) => {

    let saveResult = await messageNotApi.save(
        req.session.user.id,
        +req.params.roomId,
        +req.params.messageId
    );

    res.send(JSON.stringify(saveResult));
});

module.exports = router;