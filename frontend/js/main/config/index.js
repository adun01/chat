import module from '../';

export default module.config(function ($stateProvider) {
    $stateProvider
        .state('resolve.main', {
            abstract: true,
            template: '<div style="width: 100%;min-height: 100vh" layout="row" layout-align="left top" data-ui-view></div>',
            resolve: {
                userData: function (userService, authService, $q, $rootScope, $state) {
                    let defer = $q.defer();

                    if (!userService.get()) {
                        authService.isLogin().then(function (response) {
                            if (!response.success) {
                                $state.go('resolve.auth');
                                defer.resolve('auth is error');
                            } else {
                                userService.set(response.user);
                                $rootScope.$emit('isAuth');
                                defer.resolve('isAuth');
                            }
                        });
                    } else {
                        defer.resolve('isAuth');
                    }
                    return defer.promise;
                }
            }
        });
});