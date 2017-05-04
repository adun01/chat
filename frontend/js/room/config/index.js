import module from '../';
import roomTpl from '../view/room.view.html'

export default module.config(function ($stateProvider) {
    $stateProvider
        .state('main.room', {
            url: 'room/:name',
            controller: 'roomController',
            controllerAs: '_ctrlRoom',
            template: roomTpl,
            resolve: {
                userData: function (authService, $q, $state) {
                    let defer = $q.defer();

                    authService.isLogin().then(function (response) {
                        if (!response.success) {
                            $state.go('main.auth');
                        } else {
                            defer.resolve('isAuth');
                        }
                    });
                    return defer.promise;
                }
            },
            default: {
                name: 'main'
            }
        })
});