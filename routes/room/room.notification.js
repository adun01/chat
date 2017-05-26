const router = require('express').Router(),
    roomNotificationApi = require('../../api/notification/room.notification');

router.get('/api/room/notification', async function (req, res) {

    let searchNotification = await roomNotificationApi.get({userId: req.session.user.id});

    res.send(JSON.stringify(searchNotification));
});

module.exports = router;