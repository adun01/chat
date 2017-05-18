import module from '../';
import mainRoomTpl from '../view/room.main.view.html';

export default module.config(function ($stateProvider) {
    $stateProvider
        .state('resolve.main', {
            url: 'room/',
            controller: 'mainController',
            template: mainRoomTpl,
            params: {
                message: null
            },
            resolve: {
                mainControllerData: function ($stateParams, userService, authService, $q, $rootScope, $state) {
                    let defer = $q.defer();

                    if (!userService.get()) {
                        authService.isLogin().then(function (response) {
                            if (!response.success) {
                                $state.go('resolve.auth');
                                defer.resolve('auth is error');
                            } else {
                                userService.set(response.user);
                                $rootScope.$emit('isAuth');
                                defer.resolve($stateParams);
                            }
                        });
                    } else {
                        defer.resolve($stateParams);
                    }
                    return defer.promise;
                }
            }
        });
});