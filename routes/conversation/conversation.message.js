const router = require('express').Router(),
    conversationApi = require('../../api/conversation/'),
    eventPublish = require('../../eventPublish');

router.get('/api/conversation/:conversationId/message', async(req, res) => {

    let searchMessagesResult = await conversationApi.getMessage(
        req.session.user.id,
        +req.params.conversationId
    );

    res.send(JSON.stringify(searchMessagesResult));

});

router.post('/api/conversation/:conversationId/message', async(req, res) => {

    let newMessageResult = await conversationApi.addMessage(
        req.session.user.id,
        +req.params.conversationId,
        req.body.message
    );

    if (newMessageResult.success) {
        //eventPublish
        eventPublish.emit('newMessageRoom', newMessageResult.conversation);
    }

    res.send(JSON.stringify(newMessageResult));
});

module.exports = router;