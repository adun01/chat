import module from '../';

module.service('userService', function (socketService, subscriberPublisher) {

    let user = null;

    socketService.on('createUserAnswer', function (data) {
        subscriberPublisher.callSubscriber('createUserAnswer', data);
    });

    subscriberPublisher.addChannels('createUser', function (data) {
        socketService.emit('createUser', data);
    });

    function getUser() {
        return user;
    }

    return {
        get: getUser
    }
});