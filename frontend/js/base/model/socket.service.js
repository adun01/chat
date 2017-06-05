import module from '../';

module.service('socketServiceMediator', function ($rootScope, $timeout, $q, roomService) {

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
        }, 15000);
    });

    socket.on('roomListChange', function (data) {

        $rootScope.$emit('roomListChange', data);
    });

    socket.on('roomListChangeRemove', function (data) {
        let currentRoom = roomService.getCurrentRoom();

        if (currentRoom && currentRoom.id === +data.roomId) {
            $rootScope.$broadcast('roomListChangeRemove', data);
        }
    });

    socket.on('newNotificationRoom', function (data) {

        $rootScope.$emit('newNotificationRoom', data);
    });

    socket.on('newMessageRoom', function (data) {

        let currentRoom = roomService.getCurrentRoom();

        if (currentRoom && +currentRoom.id === +data.roomId) {

            $rootScope.$emit('newMessageRoom', data);
        }

    });

    socket.on('newNotificationRoomMessage', function (data) {

        let currentRoom = roomService.getCurrentRoom();

        if (!currentRoom || +currentRoom.id !== +data.roomId) {

            $rootScope.$emit('newNotificationRoomMessage', data);
        }
    });

    socket.on('userListChange', function (data) {
        $rootScope.$emit('userListChange', data);
    });

    return socket;
});