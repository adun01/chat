const router = require('express').Router(),
    eventsMediator = require('../../events.mediator'),
    messageNotApi = require('../../api/notification/conversation.message.notification');

router.get('/api/conversation/notification/message', async function (req, res) {

    let searchNotificationResult = await messageNotApi.get({
        userId: +req.session.user.id
    });

    res.send(JSON.stringify(searchNotificationResult));
});

router.post('/api/conversation/:conversationId/notification/message/:messageId', async function (req, res) {

    let saveResult = await messageNotApi.save({
        userId: req.session.user.id,
        userInterlocutor: +req.params.conversationId,
        messageId: +req.params.messageId
    });

    res.send(JSON.stringify(saveResult));
});

module.exports = router;