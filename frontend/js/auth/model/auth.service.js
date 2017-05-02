import module from '../';

module.service('authService', function (socketService, subscriberPublisher, $state) {

    socketService.on('logInAnswer', function (data) {
        subscriberPublisher.callSubscriber('logInAnswer', data);
    });

    function logIn(data) {
        socketService.emit('logIn', data);
    }

    return {
        logIn: logIn
    }
});