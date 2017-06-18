const router = require('express').Router(),
    userApi = require('../../api/user/');

router.post('/api/room/:roomId/notification/message/:messageId', async (req, res) => {

    let saveResult = await userApi.setNewReadMessage(
        req.session.user.id,
        +req.params.roomId,
        +req.params.messageId
    );

    res.send(JSON.stringify(saveResult));
});

module.exports = router;