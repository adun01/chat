import module from '../';
import userEditTpl from '../view/user.edit.html';

module.service('userService', function (userResource, $q, $mdDialog) {

    let user = null;

    function set(userAuth) {
        user = userAuth;
    }

    function create(data) {
        return userResource.save(data).$promise;
    }

    function update(data) {
        return userResource.update(data).$promise;
    }

    function search(data) {

        let deffer = $q.defer();

        userResource.get(data).$promise.then(function (response) {
            deffer.resolve(response.users);
        });
        return deffer.promise;
    }

    function get() {
        return user;
    }

    function photoPath(userCur) {
        if (userCur) {
            return userCur.photo ? '/images/users/' + userCur.id + '/' + userCur.photo : '/images/user_null.png';
        }
        return user.photo ? '/images/users/' + user.id + '/' + user.photo : '/images/user_null.png';
    }

    function editUser(e) {
        $mdDialog.show({
            controller: 'userEditController',
            controllerAs: '_ctrlUser',
            template: userEditTpl,
            parent: angular.element(document.body),
            targetEvent: e,
            clickOutsideToClose: true
        });
    }

    function showUser(e, user) {
        $mdDialog.show({
            controller: function (user) {
                const _ctrl = this;
                _ctrl.user = user;
            },
            controllerAs: '_ctrl',
            template: '<md-dialog flex="80">' +
            '<user-show data-user="_ctrl.user"></user-show>' +
            '</md-dialog>',
            parent: angular.element(document.body),
            targetEvent: e,
            clickOutsideToClose: true,
            resolve: {
                user: function () {
                    return user;
                }
            }
        });
    }

    return {
        create: create,
        get: get,
        set: set,
        search: search,
        update: update,
        photo: photoPath,
        editUser: editUser,
        showUser: showUser
    }
});