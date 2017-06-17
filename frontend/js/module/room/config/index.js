import module from '../';
import roomTpl from '../view/room.view.html'

export default module.config(function ($stateProvider) {
    $stateProvider
        .state('main.room', {
            url: 'room/:id/',
            controller: 'roomController',
            controllerAs: '_ctrlRoom',
            template: roomTpl,
            resolve: {
                roomData: function (authService, $stateParams, roomService, $q, $state) {
                    let defer = $q.defer();

                    authService.isLogin().then(function (response) {
                        if (!response.success) {
                            $state.go('main.auth');
                            defer.resolve('auth is error');
                        } else {
                            roomService.get({id: $stateParams.id}).then(function (response) {

                                if (!response.success) {
                                    defer.resolve(response);
                                    $state.go('main.base');
                                } else {
                                    defer.resolve(response);
                                }

                            });
                        }
                    });

                    return defer.promise;
                }
            }
        });
});