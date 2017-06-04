import module from '../../../';

module.controller('roomListController', function ($scope, roomService, $timeout, $rootScope, $state) {
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
        });
    }

    let roomListChange = $rootScope.$on('roomListChange', function () {
        $timeout(function () {
            getListRoom();
        });
    });

    $scope.$on('$destroy', function () {
        roomListChange();
    });

    getListRoom();
});