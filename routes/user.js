const router = require('express').Router(),
    userApi = require('../api/user/');

router.get('/api/user?:query', async(req, res) => {

    let result = await userApi.query(
        req.query.query
    );

    res.send(JSON.stringify(result));
});

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
        req.session.user.id,
        req.headers,
        req,
        req.session
    );

    res.send(JSON.stringify(result));
});

module.exports = router;