const router = require('express').Router(),
    eventsMediator = require('../../events.mediator'),
    messageApi = require('../../api/message/conversation.message');

router.get('/api/conversation/:conversationId/message', async function (req, res) {

    let searchMessagesResult = await messageApi.get({
        userInterlocutor: +req.params.conversationId,
        userId: +req.session.user.id
    });

    res.send(JSON.stringify(searchMessagesResult));

});

router.post('/api/conversation/:conversationId/message', async function (req, res) {

    let newMessageResult = await messageApi.add({
        userId: req.session.user.id,
        message: req.body.message,
        userInterlocutor: +req.params.conversationId
    });

    if (newMessageResult.success) {

        eventsMediator.emit('newMessageConversation', {
            message: newMessageResult.message,
            userInterlocutor: +req.params.conversationId,
            roomId: newMessageResult.conversation.id
        });

        eventsMediator.emit('newNotificationConversationMessage', {
            userId: req.session.user.id,
            userInterlocutor: +req.params.conversationId,
            roomId: newMessageResult.conversationId,
            conversation: newMessageResult.conversation
        });
    }


    res.send(JSON.stringify(newMessageResult));


});

module.exports = router;