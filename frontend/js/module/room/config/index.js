import module from '../';
import roomTpl from '../view/room.view.html'

export default module.config(($stateProvider) => {
    $stateProvider
        .state('main.room', {
            url: 'room/:id/',
            controller: 'roomController',
            controllerAs: '_ctrlRoom',
            template: roomTpl,
            resolve: {
                roomData: ($q, roomService, authService, $stateParams) => {
                    let defer = $q.defer();

                    authService.isLogin().then((user) => {

                        if (!user) {
                            $state.go('main.auth');
                        } else {

                            roomService.get($stateParams).then((response) => {
                                defer.resolve(response.room);
                            });
                        }
                    });
                    return defer.promise;
                }
            }
        });
});