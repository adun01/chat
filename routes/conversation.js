const router = require('express').Router(),
    conversationApi = require('../api/conversation/');

router.get('/api/conversation/:id', async function (req, res) {
    
    let result = await conversationApi.get({
        userId: +req.session.user.id,
        userInterlocutor: +req.params.id
    });

    res.send(JSON.stringify(result));
});

module.exports = router;