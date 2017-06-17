import module from '../';

module.service('socketMediator', function (socketService, $rootScope, $timeout, $q, roomService, userService) {

    socketService.on('newMessageRoom', function (data) {

        let currentRoom = roomService.getCurrentRoom();

        if (currentRoom && +currentRoom.id === +data.roomId) {

            $rootScope.$emit('newMessageRoom', data);
        }
    });

    socketService.on('messageNotification', function (data) {

        let currentRoom = roomService.getCurrentRoom();

        if (!currentRoom) {

            $rootScope.$emit('messageNotification', data);
        }
    });

    socketService.on('banned', function (data) {

        let currentRoom = roomService.getCurrentRoom(),
            user = userService.get();

        if (user.id === data.userId && currentRoom && +currentRoom.id === +data.roomId) {

            $rootScope.$emit('banned', data);
        }

    });
});