import module from '../';
import userShowTpl from '../view/user.show.view.html';
import userEditTpl from '../view/user.edit.view.html';

module.service('userService', function (socketService, userResource, $q, $mdDialog) {

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
        let deffer = $q.defer(),
            users;
        userResource.get(data).$promise.then(function (response) {
            users = response.users.map(function (user) {
                user.photo = photoPath(user);
                return user;
            });
            deffer.resolve(users);
        });
        return deffer.promise;
    }

    function get() {
        return user;
    }

    function photoPath(userCur) {
        return user.photo ? '/images/users/' + user.id + '/' + user.photo : '/images/user_null.png';
    }

    function editUser(e) {
        $mdDialog.show({
            controller: 'userEditController',
            controllerAs: '_ctrlUserEdit',
            template: userEditTpl,
            parent: angular.element(document.body),
            targetEvent: e,
            clickOutsideToClose: true
        });
    }

    return {
        create: create,
        get: get,
        set: set,
        search: search,
        update: update,
        photo: photoPath,
        editUser: editUser
    }
});