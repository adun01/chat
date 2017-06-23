import module from '../';

module.service('authService', function (authResource, $window, userService, $q, $timeout) {

    function logIn(data) {
        return authResource.save(data).$promise;
    }

    function logOut() {
        return authResource.delete().$promise.then(function () {
            $window.location.href = '/auth';
        });
    }

    function isLogin() {
        let defer = $q.defer(),
            user = userService.get();

        if (!user) {
            authResource.get().$promise.then((response) => {

                if (response.success) {
                    userService.set(response.user);
                }

                defer.resolve(response.user);
            });
        } else {
            $timeout(() => {
                defer.resolve(user);
            });
        }

        return defer.promise;
    }

    return {
        logIn: logIn,
        isLogin: isLogin,
        logOut: logOut
    };
});