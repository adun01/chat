import module from '../../../';

module.controller('roomListController', function ($scope, roomService, $timeout, $rootScope, $state, notificationRoomMessageService) {
    const _ctrlRoomList = this;

    _ctrlRoomList.data = {
        rooms: []
    };

    _ctrlRoomList.addRoom = roomService.addRoom;

    _ctrlRoomList.openRoom = function (room) {
        $state.go('main.room', {
            id: room.id
        });
    };

    function getListRoom() {
        roomService.get().then(function (response) {
            _ctrlRoomList.data.rooms = response.rooms;

            notificationRoomMessageService.get().then(function (response) {
                response.notifications.forEach(function (notification) {
                    let roomId = notification.roomId;
                    let room = _ctrlRoomList.data.rooms.find(function (iRoom) {
                        return iRoom.id === roomId;
                    });

                    room.notificationCount = notification.count;
                });
            });
        });
    }

    _ctrlRoomList.updateNotification = function (notification) {
        _ctrlRoomList.data.rooms.forEach(function (iRoom) {
            if (iRoom.id === notification.roomId) {
                if (!iRoom.notificationCount) {
                    iRoom.notificationCount = 0;
                }
                iRoom.notificationCount++;
            }
        });
    };

    _ctrlRoomList.clearNotification = function (notification) {
        _ctrlRoomList.data.rooms.forEach(function (iRoom) {
            if (iRoom.id === notification.roomId) {
                iRoom.notificationCount = 0;
            }
        });
    };

    let newNotificationMessage = $rootScope.$on('newNotificationRoomMessage', function ($event, data) {
        $timeout(function () {
            _ctrlRoomList.updateNotification(data);
        });
    });

    let roomListChange = $rootScope.$on('roomListChange', function () {
        $timeout(function () {
            getListRoom();
        });
    });

    let clearNotificationCount = $rootScope.$on('clearNotificationCount', function ($event, data) {
        $timeout(function () {
            _ctrlRoomList.clearNotification(data);
        });
    });

    $scope.$on('$destroy', function () {
        roomListChange();
        clearNotificationCount();
        newNotificationMessage();
    });

    getListRoom();
});