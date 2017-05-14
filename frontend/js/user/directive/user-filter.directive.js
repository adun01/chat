import module from '../';
import userFilterTpl from '../view/user-filter.view.html';

module.directive('userFilter', function () {
    return {
        template: userFilterTpl,
        controller: userFilterController,
        controllerAs: 'userFilter',
        scope: {
            collection: '=collection'
        },
    }
});

function userFilterController($scope, $attrs, $q, userService) {

    const userFilter = this;

    userFilter.placeholder = $attrs.placeholder;

    userFilter.roomId = $attrs.roomId;

    userFilter.searchUsers = searchUsers;

    userFilter.userInvited = $scope.collection;

    userFilter.oldQuery;

    function searchUsers(query) {
        var deferred = $q.defer();

        if (query) {
            if (userFilter.oldQuery === query) {
                deferred.resolve(userFilter.users);
            } else {
                userFilter.oldQuery = query;
                userService.search({query: query}).then(function (users) {
                    userFilter.users = users;
                    deferred.resolve(users);
                });
            }

        } else {
            deferred.resolve([]);
        }
        return deferred.promise;
    }
}