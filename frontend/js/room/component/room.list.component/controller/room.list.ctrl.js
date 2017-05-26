import module from '../../../';

module.controller('roomListController', function (roomService, $timeout, subscribePublish) {
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

    subscribePublish.subscribe({
        name: 'roomListChange',
        fn: function () {
            $timeout(function () {
                getListRoom();
            });
        }
    });

    getListRoom();
});