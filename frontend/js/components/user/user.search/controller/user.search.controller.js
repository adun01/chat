import module from '../../../';

module.controller('userSearchController', function (roomService, $q, userService, $state) {
    const _ctrlUserSearch = this;

    _ctrlUserSearch.data = {
        users: []
    };

    _ctrlUserSearch.photo = userService.photo;

    _ctrlUserSearch.showUser = function (user) {
        if (_ctrlUserSearch.user.id === user.id) {
            userService.editUser();
        } else {
            userService.showUser(null, user);
        }
    };

    _ctrlUserSearch.room = roomService.getCurrentRoom();

    _ctrlUserSearch.user = userService.get();

    _ctrlUserSearch.placeholder = 'Введите логин искомого друга';

    _ctrlUserSearch.oldQuery = null;

    _ctrlUserSearch.openRoom = function (user) {

        $state.go('main.conversation', {
            id: user.id
        });
    };

    _ctrlUserSearch.searchUsers = function (query) {

        if (query) {
            _ctrlUserSearch.oldQuery = query;
            userService.search({query: query}).then(function (users) {
                _ctrlUserSearch.data.users = users;
            });
        } else {
            _ctrlUserSearch.data.users = [];
        }
    }
});