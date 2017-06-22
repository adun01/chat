const router = require('express').Router(),
    conversationApi = require('../../api/conversation/');

router.get('/api/conversation/:id/', async(req, res) => {

    let result = await conversationApi.get(
        req.session.user.id,
        +req.params.id
    );

    res.send(JSON.stringify(result));
});

module.exports = router;