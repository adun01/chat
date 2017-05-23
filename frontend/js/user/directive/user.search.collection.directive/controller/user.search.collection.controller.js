import module from '../../../';

module.controller('userSearchCollectionController', function ($scope, $attrs, $q, userService) {

    const _ctrlSearchColl = this;

    _ctrlSearchColl.placeholder = $attrs.placeholder;

    _ctrlSearchColl.searchUsers = searchUsers;

    _ctrlSearchColl.userInvited = $scope.collection;

    _ctrlSearchColl.oldQuery;

    function searchUsers(query) {
        let deferred = $q.defer();

        if (query) {
            if (_ctrlSearchColl.oldQuery === query) {
                deferred.resolve(_ctrlSearchColl.users);
            } else {
                _ctrlSearchColl.oldQuery = query;
                userService.search({query: query}).then(function (users) {
                    _ctrlSearchColl.users = users;
                    deferred.resolve(users);
                });
            }

        } else {
            deferred.resolve([]);
        }
        return deferred.promise;
    }
});