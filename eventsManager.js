const userEvents = require('./api/user/');

module.exports = function (io) {
    io.on('connection', function (socket) {
        socket.on('createUser', function (data) {
            userEvents.create(data).then(function (user) {
                socket.emit('createUserAnswer', user);
            }, function (err) {
                socket.emit('createUserAnswer', err);
            });
        });
    });
};