import module from '../../';

module.controller('roomListController', function (roomService, $rootScope) {
    const _ctrlRoomList = this;
    
    _ctrlRoomList.data = {
        list: []
    };

    _ctrlRoomList.addRoom = roomService.addRoom;

    function getListRoom() {
        roomService.get().then(function (response) {
            _ctrlRoomList.data.list = response.list;
        });
    }

    $rootScope.$on('roomListReInit', function () {
        getListRoom();
    });

    getListRoom();
});