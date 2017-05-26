const router = require('express').Router(),
    eventsMediator = require('../../events.mediator'),
    messageApi = require('../../api/message/');

router.get('/api/room/:id/message', async function (req, res) {
    let seacrMessagesResult = await messageApi.get({
        roomId: +req.params.id,
        userId: +req.session.user.id
    });

    res.send(JSON.stringify(seacrMessagesResult));

});

router.post('/api/room/:id/message', async function (req, res) {

    let newMessageResult = await messageApi.add({
        userId: req.session.user.id,
        message: req.body.message,
        roomId: req.body.id
    });

    eventsMediator.emit('newMessage', {
        message: newMessageResult.message,
        roomId: req.body.id,
        userId: req.session.user.id
    });

    res.send(JSON.stringify(newMessageResult));


});

module.exports = router;