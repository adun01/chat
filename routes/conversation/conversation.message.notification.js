const router = require('express').Router(),
    userApi = require('../../api/user/');

router.post('/api/conversation/:conversationId/notification/message/:messageId', async(req, res) => {

    let saveResult = await userApi.setNewReadMessage(
        req.session.user.id,
        +req.params.conversationId,
        +req.params.messageId,
        'conversations'
    );

    res.send(JSON.stringify(saveResult));
});

module.exports = router;