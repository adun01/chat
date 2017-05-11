import module from '../';

export default module.config(function ($stateProvider) {
    $stateProvider
        .state('resolve.main', {
            abstract: true,
            template: '<div flex="60"' +
            'flex-xs="60"' +
            'flex-gt-xs="50"' +
            'flex-sm="50"' +
            'flex-gt-sm="50"' +
            'flex-md="40"' +
            'flex-gt-md="40"' +
            'flex-lg="40"' +
            'flex-gt-lg="30"' +
            'flex-xl="30" data-ui-view></div>',
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