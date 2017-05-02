const userEvents = require('./api/user/'),
    authEvents = require('./api/auth/');

module.exports = function (io) {
    io.on('connection', function (socket) {
        socket.on('createUser', function (data) {
            userEvents.create(data).then(function (user) {
                socket.emit('createUserAnswer', user);
            }, function (err) {
                socket.emit('createUserAnswer', err);
            });
        });

        socket.on('logIn', function (data) {
            authEvents.logIn(data).then(function (user) {
                socket.emit('logInAnswer', user);
            }, function (err) {
                socket.emit('logInAnswer', err);
            });
        });
    });
};