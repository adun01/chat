const router = require('express').Router(),
    userApi = require('../api/user/');

router.post('/api/user', async function (req, res) {

    let result = await userApi.create({
        login: req.body.login,
        email: req.body.email,
        password: req.body.password,
        session: req.session
    });

    res.send(JSON.stringify(result));
});

router.put('/api/user/', async function (req, res) {

    let result = await userApi.update({
        id: +req.params.id,
        login: req.body.login,
        session: req.session,
        user: req.session.user,
        headers: req.headers,
        req: req
    });

    res.send(JSON.stringify(result));
});

router.get('/api/user/', function (req, res) {
    userApi.searchQuery(req).then(function (response) {
        res.send(JSON.stringify(response));
    });
});

module.exports = router;