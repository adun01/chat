import module from '../../../';

module.controller('roomListController', function ($scope, roomService, $timeout, $rootScope) {
    const _ctrlRoomList = this;

    _ctrlRoomList.data = {
        rooms: []
    };

    _ctrlRoomList.addRoom = roomService.addRoom;

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