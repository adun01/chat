const router = require('express').Router(),
    userApi = require('../api/user/');

router.post('/api/user', async(req, res) => {

    let result = await userApi.create(
        req.body.login,
        req.body.password,
        req.body.email,
        req.session
    );

    res.send(JSON.stringify(result));
});

router.put('/api/user/', async(req, res) => {

    let result = await userApi.update(
        req.body.login,
        req.session.id,
        req.headers,
        req
    );

    res.send(JSON.stringify(result));
});

module.exports = router;