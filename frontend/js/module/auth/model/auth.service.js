import module from '../';

module.service('authService', function (authResource, $window) {

    function logIn(data) {
        return authResource.save(data).$promise;
    }

    function logOut() {
        return authResource.delete().$promise.then(function () {
            $window.location.href = '/auth';
        });
    }

    function isLogin() {
        return authResource.get().$promise;
    }

    return {
        logIn: logIn,
        isLogin: isLogin,
        logOut: logOut
    }
});