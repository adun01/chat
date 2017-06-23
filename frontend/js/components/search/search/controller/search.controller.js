import module from '../../../';

module.controller('searchController', function (searchService, userService, $state) {
    const _ctrlSearch = this;

    _ctrlSearch.data = {
        collection: []
    };

    _ctrlSearch.user = userService.get();

    _ctrlSearch.placeholder = 'Поиск';

    _ctrlSearch.getUserConversation = (users) => {
        return users.find((user) => {
            return _ctrlSearch.user.id !== user.id;
        });
    };

    _ctrlSearch.openRoom = function (room) {
        $state.go('main.room', {
            id: room.id
        });
    };

    _ctrlSearch.searchRooms = function (query) {

        if (query) {

            searchService.get({query: query}).then(function (collection) {
                _ctrlSearch.data.collection = collection;
            });

        } else {
            _ctrlSearch.data.collection = [];
        }
    };
});