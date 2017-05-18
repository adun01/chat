import module from '../';
import authTpl from '../view/auth.view.html'

export default module.config(function ($stateProvider) {
    $stateProvider
        .state('resolve', {
            url: '/',
            template: '<div class="chat-layout"' +
            'layout="row"' +
            'layout-align="left center"' +
            'data-ui-view>',
            resolve: {
                userData: function ($q, authService, $rootScope, userService) {
                    let defer = $q.defer();

                    authService.isLogin().then(function (response) {
                        if (!response.success) {
                            defer.resolve('auth is error');
                        } else {
                            userService.set(response.user);
                            $rootScope.$emit('isAuth');
                            defer.resolve('isAuth');
                        }
                    });
                    return defer.promise;
                }

            }
        })
        .state('resolve.auth', {
            url: 'auth/',
            controller: 'authController',
            controllerAs: '_ctrlAuth',
            template: authTpl
        })
});