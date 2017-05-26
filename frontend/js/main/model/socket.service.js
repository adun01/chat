import module from '../';

module.service('socketServiceMediator', function ($timeout, $q, subscribePublish, roomService) {
    const socket = io();

    subscribePublish.subscribe({
        name: 'roomOpen',
        fn: function (data) {

            socket.emit('roomOpen', data);
        }
    });

    socket.on('userListChange', function (data) {
        let currentRoom = roomService.getCurrentRoom();

        if (currentRoom.id === +data.roomId) {
            subscribePublish.publish({
                name: 'userListChange',
                data: data
            });
        }
    });

    socket.on('roomListChange', function (data) {
        subscribePublish.publish({
            name: 'roomListChange',
            data: data
        });
    });

    socket.on('roomListChangeRemove', function (data) {
        let currentRoom = roomService.getCurrentRoom();

        if (currentRoom.id === +data.roomId) {
            subscribePublish.publish({
                name: 'roomListChangeRemove',
                data: data
            });
        }
    });

    socket.on('newNotificationRoom', function (data) {

        subscribePublish.publish({
            name: 'newNotificationRoom',
            data: data
        });
    });

    return null;
});