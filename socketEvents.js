const eventsMediator = require('./events.mediator'),
    config = require('./config'),
    listUserOnline = require('./listUserOnline');

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
        listUserOnline.add(socket.user);


        socket.on('roomOpen', function (data) {
            socket.join(data.roomId);
        });

        socket.on('disconnect', function () {
            listUserOnline.remove(socket.user.id);
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

    eventsMediator.on('newMessageConversation', function (data) {
        io.to(data.roomId).emit('newMessageRoom', data);
    });

    eventsMediator.on('newNotificationRoomMessage', function (data) {

        let usersNotification = data.userIds.filter(function (id) {
            return id !== data.userId;
        });

        usersNotification.forEach(function (id) {

            let socket = sockets.get(id);

            if (socket) {
                socket.emit('newNotificationRoomMessage', data);
            }
        });

    });

    eventsMediator.on('newNotificationConversationMessage', function (data) {

        let socket = sockets.get(data.userInterlocutor);

        if (socket) {
            socket.emit('newNotificationConversationMessage', data);
        }

    });
};