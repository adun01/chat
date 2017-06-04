import module from '../../../';

module.controller('roomSearchController', function (roomService, $state) {
    const _ctrlRoomSearch = this;

    _ctrlRoomSearch.data = {
        rooms: []
    };

    _ctrlRoomSearch.placeholder = 'Введите имя искомой комнаты';
    _ctrlRoomSearch.openRoom = function (room) {
        $state.go('main.room', {
            id: room.id
        });
    };

    _ctrlRoomSearch.searchRooms = function (query) {

        if (query) {

            roomService.get({query: query, search: true}).then(function (response) {
                _ctrlRoomSearch.data.rooms = response.rooms;
            });

        } else {

            _ctrlRoomSearch.data.rooms = [];
        }
    }
});