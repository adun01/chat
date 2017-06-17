const router = require('express').Router(),
    authApi = require('../api/auth/');

router.post('/api/auth', async (req, res) => {

    let result = await authApi.logIn(
        req.body.login,
        req.body.password,
        req.session
    );

    res.send(JSON.stringify(result));
});

router.delete('/api/auth', async (req, res) => {
    await authApi.logOut(req.sessionID);
    res.send(JSON.stringify({success: true}));
});

router.get('/api/auth', async (req, res) => {
    let result = await authApi.isAuth(req.sessionID);
    res.send(JSON.stringify(result));
});

module.exports = router;