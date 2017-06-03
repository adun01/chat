const router = require('express').Router(),
    eventsMediator = require('../events.mediator'),
    authApi = require('../api/auth/');

router.post('/api/auth', async function (req, res) {

    let result = await authApi.logIn({
        login: req.body.login,
        password: req.body.password,
        session: req.session
    });
    res.send(JSON.stringify(result));
});

router.delete('/api/auth', async function (req, res) {
    await authApi.logOut({sessionID: req.sessionID});
    res.send(JSON.stringify({success: true}));
});

router.get('/api/auth', async function (req, res) {
    let result = await authApi.isAuth({sessionID: req.sessionID});
    res.send(JSON.stringify(result));
});

module.exports = router;