import module from '../';

module.controller('roomListController', function (roomService, $rootScope) {
    const roomListCtrl = this;

    roomListCtrl.data = {
        list: []
    };

    roomListCtrl.addRoom = roomService.addRoom;

    function getListRoom() {
        roomService.get().then(function (response) {
            roomListCtrl.data.list = response.list;
        });
    }

    $rootScope.$on('roomListReInit', function () {
        getListRoom();
    });

    getListRoom();
});