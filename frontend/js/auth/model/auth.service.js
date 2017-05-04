import module from '../';

module.service('authService', function (socketService, subscriberPublisher, authResource) {

    function logIn(data) {
        return authResource.save(data).$promise;
    }

    function isLogin() {
        return authResource.get().$promise;
    }

    return {
        logIn: logIn,
        isLogin: isLogin
    }
});