const userEvents = require('./api/user/'),
    authEvents = require('./api/auth/'),
    sessionEvents = require('./api/session/'),
    config = require('./config'),
    _ = require('lodash');

function clearUserData(obj) {
    return _.pick(obj, config.user.field);
}

module.exports = function (io) {
    io.on('connection', function (socket) {
        socket.on('createUser', function (data) {
            userEvents.create(data).then(function (user) {
                socket.emit('createUserAnswer', user);
            }, function (err) {
                socket.emit('createUserAnswer', err);
            });
        });

        socket.on('getSession', function () {
            sessionEvents.get({session: socket.handshake.session}).then(function (data) {
                socket.emit('getSessionAnswer', data);
            }, function (err) {
                debugger;
            });
        });

    });
};