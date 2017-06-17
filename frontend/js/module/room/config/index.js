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
                baseData: ($q, roomService, authService) => {
                    let defer = $q.defer();

                    authService.isLogin().then((user) => {

                        if (!user) {
                            $state.go('main.auth');
                        } else {
                            defer.resolve();
                        }
                    });
                    return defer.promise;
                }
            }
        });
});