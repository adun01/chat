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

        socket.on('disconnect', function () {
        });

        socket.on('roomOpen', async function (data) {
            await socket.join(data.id);
            roomListUserOnline.add(data.id, clearUserData(sockets.get(socket.user.id).user));
        });

        socket.on('roomListChange', function (data) {
            let list = roomListUserOnline.get();
            io.to(data.id).emit('roomListChange', list);
        });
    });

    eventsMediator.on('newMessage', function (data) {
        io.to(data.roomId).emit('newMessage', {
            message: data.message,
            roomid: data.roomId,
            user: clearUserData(clearUserData(sockets.get(data.userId).user))
        });
    });

    eventsMediator.on('userListChange', function (data) {
        let socket = sockets.get(data.userId);

        io.to(data.roomId).emit('userListChange', {
            roomId: data.roomId,
            userId: data.userId
        });

        socket.emit('roomListChange', {
            roomId: data.roomId,
            action: 'remove'
        });

        socket.emit('outOfRoom', {
            roomId: data.roomId
        });
    });

    eventsMediator.on('addUserInvited', async function (data) {

        let searchRoom = await roomApi.search(data.roomId),
            socket = sockets.get(data.userId);

        if (socket) {
            socket.emit('addUserInvited', {
                room: searchRoom.room
            });
        }
    });
};