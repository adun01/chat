import module from '../';

module.service('socketMediator',
    function (socketService, $rootScope, $timeout, $q, roomService, userService) {

        socketService.on('newMessageRoom', data => {

            let currentRoom = roomService.getCurrentRoom();

            if (currentRoom && +currentRoom.id === +data.id) {

                $rootScope.$emit('newMessageRoom', data);
            } else if (!currentRoom) {
                $rootScope.$emit('newNotification', data);
            }
        });

        socketService.on('messageNotification', data => {

            let currentRoom = roomService.getCurrentRoom();

            if (!currentRoom) {

                $rootScope.$emit('messageNotification', data);
            }
        });

        socketService.on('banned', data => {

            let currentRoom = roomService.getCurrentRoom(),
                user = userService.get();

            if (user.id === data.userId && currentRoom && +currentRoom.id === +data.roomId) {

                $rootScope.$emit('banned', data);
            }

        });
    });