import module from '../';

module.service('userService', function (socketService, userResource, $q) {

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
        let currentUser = userCur ? userCur : user;
        return currentUser && currentUser.photo ? '/images/users/' + currentUser.id + '/' + currentUser.photo : '/images/user_null.png';
    }

    return {
        create: create,
        get: get,
        set: set,
        search: search,
        update: update,
        photo: photoPath
    }
});