import module from '../';

module.service('userService', function (socketService, userResource) {

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

    function get() {
        return user;
    }

    return {
        create: create,
        get: get,
        set: set,
        update: update,
        photo: function () {
            return user && user.photo ? '/images/users/' + user.id + '/' + user.photo : '/images/user_null.png';
        }
    }
});