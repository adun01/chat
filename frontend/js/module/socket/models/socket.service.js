import module from '../';

module.service('socketService', function (roomService) {

    var socket = io.connect({
        reconnection: false
    });

    socket.on('connect', function () {

        let currentRoom = roomService.getCurrentRoom();

        if (currentRoom) {
            socket.emit('roomOpen', {roomId: currentRoom.id});
        }

    });
    function recconect() {
        socket.connect();
    }

    socket.on('disconnect', function () {
        recconect();
    });

    socket.on('connect_error', function () {
        setTimeout(function () {
            recconect();
        }, 500);
    });

    return socket;
});