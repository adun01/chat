const userEvents = require('./api/user/'),
    authEvents = require('./api/auth/'),
    roomApi = require('./api/room'),
    sessionEvents = require('./api/session/'),
    eventsMediator = require('./events.mediator'),
    config = require('./config'),
    _ = require('lodash');

function clearUserData(obj) {
    return _.pick(obj, config.user.field);
}

const roomListUserOnline = (function () {
    let roomList = [];

    return {
        getUserInRoom: function (idRoom, idUser) {
            return roomList[idRoom][idUser];
        },
        get: function () {
            return roomList;
        },
        add: function (roomId, user) {

            if (!roomList[roomId]) {
                roomList[roomId] = [];
            }

            roomList[roomId][user.id] = user;
        }
    }
}());

const sockets = (function () {
    let socketList = [];

    return {
        get: function (idUser) {
            return socketList[idUser];
        },
        add: function (socket) {
            socketList[socket.user.id] = socket;
        }
    }
}());

module.exports = function (io) {
    io.on('connection', function (socket) {

        sockets.add(socket);

        socket.on('roomOpen', async function (data) {

            await socket.join(data.id);
            roomListUserOnline.add(data.id, clearUserData(sockets.get(socket.user.id).user));
        });

    });

    eventsMediator.on('roomListChange', function (data) {
        let socket = sockets.get(data.userId);

        if (socket) {
            socket.emit('roomListChange');
        }
    });

    eventsMediator.on('roomListChangeRemove', async function (data) {
        let socket = sockets.get(data.userId);

        await socket.leave(data.userId);

        if (socket) {
            socket.emit('roomListChangeRemove', {
                roomId: data.roomId
            });
        }
    });

    eventsMediator.on('newNotificationRoom', function (data) {
        let socket = sockets.get(data.userId);

        if (socket) {
            socket.emit('newNotificationRoom', data);
        }
    });

    eventsMediator.on('userListChange', function (data) {
        io.to(data.roomId).emit('userListChange', data);
    });

    eventsMediator.on('newMessageRoom', function (data) {
        io.to(data.roomId).emit('newMessageRoom', data);
    });
};