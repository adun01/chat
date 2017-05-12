import module from '../';

module.controller('roomListController', function (roomService) {
    const roomListCtrl = this;

    roomListCtrl.data = {
        list: []
    };

    function getListRoom() {
        roomService.get().then(function (response) {
            roomListCtrl.data.list = response.list;
        });
    }

    getListRoom();
});