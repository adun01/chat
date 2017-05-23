import module from '../../../';

module.controller('userSearchController', function ($attrs, $q, userService) {
    const _ctrlUserSearch = this;

    _ctrlUserSearch.data = {
        users: []
    };

    _ctrlUserSearch.placeholder = 'Введите логин искомого друга';

    _ctrlUserSearch.oldQuery = null;

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