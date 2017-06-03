import module from '../../../';

module.controller('roomSearchController', function (roomService, $q) {
    const _ctrlRoomSearch = this;

    _ctrlRoomSearch.data = {
        rooms: []
    };

    _ctrlRoomSearch.placeholder = 'Введите имя искомой комнаты';

    _ctrlRoomSearch.oldQuery = null;

    _ctrlRoomSearch.searchRooms = function (query) {

        if (query) {
            _ctrlRoomSearch.oldQuery = query;

            roomService.get({query: query, search: true}).then(function (response) {
                _ctrlRoomSearch.data.rooms = response.rooms;
            });
        } else {
            _ctrlRoomSearch.data.rooms = [];
        }
    }
});