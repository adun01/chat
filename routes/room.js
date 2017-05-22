const router = require('express').Router(),
    roomApiUserAgreed = require('../api/room/room.userAgreed'),
    roomApi = require('../api/room/');

/*router.get('/api/roombase', function (req, res) {
 roomApi.create({name: 'base', userInvited: '27,28,29'}, 0);
 });*/

router.get('/api/room/userAgreed', function (req, res) {
    roomApiUserAgreed.get({id:+req.query.id}).then(function (result) {
        res.send(JSON.stringify(result));
    });
});

router.get('/api/room', function (req, res) {
    roomApi.get(req.query.id, req.session.user.id).then(function (result) {
        res.send(JSON.stringify(result));
    });
});

router.post('/api/room', function (req, res) {
    roomApi.create(req.body, req.session.user.id).then(function (response) {
        res.send(JSON.stringify({room: response}));
    });
});

module.exports = router;