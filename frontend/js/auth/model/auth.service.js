import module from '../';

module.service('authService', function (authResource) {

    function logIn(data) {
        return authResource.save(data).$promise;
    }

    function logOut() {
        return authResource.delete().$promise;
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