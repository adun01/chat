import module from '../';
import roomTpl from '../view/room.view.html'

export default module.config(function ($stateProvider) {
    $stateProvider
        .state('main.room', {
            url: ':id/',
            controller: 'roomController',
            controllerAs: '_ctrlRoom',
            template: roomTpl,
            resolve: {
                roomData: function (authService, $stateParams, roomService, $q, $state, sideBarService, $mdDialog) {
                    let defer = $q.defer();

                    authService.isLogin().then(function (response) {
                        if (!response.success) {
                            $state.go('main.auth');
                            defer.resolve('auth is error');
                        } else {
                            roomService.get({id: $stateParams.id}).then(function (response) {

                                if (response.success) {
                                    sideBarService.hideNavOut();
                                    $mdDialog.cancel();
                                    sideBarService.unLocked();

                                    roomService.set(response.room);

                                    defer.resolve(response.room);
                                } else {
                                    $state.go('main.base', {
                                        message: response.message
                                    });
                                }
                            });
                        }
                    });

                    return defer.promise;
                }
            }
        });
});