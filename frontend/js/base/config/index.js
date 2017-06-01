import module from '../';
import baseTpl from '../view/base.view.html';

export default module.config(function ($stateProvider) {
    $stateProvider
        .state('main.base', {
            url: 'base/',
            controller: 'baseController',
            template: baseTpl,
            params: {
                message: null
            },
            resolve: {
                baseControllerData: function ($stateParams, userService, authService, $q, $rootScope, $state, roomService) {
                    let defer = $q.defer();

                    authService.isLogin().then(function (response) {

                        roomService.set(null);

                        if (!response.success) {
                            $state.go('main.auth');
                            defer.resolve('auth is error');
                        } else {
                            userService.set(response.user);
                            $rootScope.$emit('isAuth');
                            defer.resolve($stateParams);
                        }
                    });

                    return defer.promise;
                }
            }
        });
});