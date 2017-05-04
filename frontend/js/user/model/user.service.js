import module from '../';

module.service('userService', function (socketService, subscriberPublisher, userResource) {

    let user = null;

    subscriberPublisher.addChannels('userAuth', function (userAuth) {
        user = userAuth;
    });

    function create(data) {
        return userResource.save(data).$promise;
    }

    function getUser() {
        return user;
    }

    return {
        create: create,
        get: getUser
    }
});