const userEvents = require('./api/user/'),
    authEvents = require('./api/auth/'),
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
let currSocket;
module.exports = function (io) {
    io.on('connection', function (socket) {

        currSocket = socket;

        socket.on('disconnect', function () {
        });

        socket.on('roomOpen', async function (data) {
            await socket.join(data.id);
            roomListUserOnline.add(data.id, clearUserData(socket.user));
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
            user: clearUserData(currSocket.user)
        });
    });
};