const eventPublish = require('./eventPublish'),
    config = require('./config'),
    listUserOnline = require('./listUserOnline');

const sockets = (() => {
    let socketList = [];

    return {
        get: (idUser) => {
            return socketList[idUser];
        },
        add: (socket) => {
            socketList[socket.user.id] = socket;
        }
    }
})();


module.exports = (io) => {
    io.on('connection', (socket) => {

        sockets.add(socket);
        listUserOnline.add(socket.user);

        socket.on('disconnect', () => {
            listUserOnline.remove(socket.user.id);
        });
    });

    eventPublish.on('newMessageRoom', (room) => {

        room.users.forEach((userId) => {
            let socket = sockets.get(userId);

            if (socket) {
                socket.emit('newMessageRoom', room);
                socket.emit('messageNotification', room);
            }
        });
    });

    eventPublish.on('banned', (data) => {
        let socket = sockets.get(data.userId);

        socket.emit('banned', data);
    });
};