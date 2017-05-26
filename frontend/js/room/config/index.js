import module from '../';
import roomTpl from '../view/room.view.html'

export default module.config(function ($stateProvider) {
    $stateProvider
        .state('resolve.main.room', {
            url: ':id/',
            controller: 'roomController',
            controllerAs: '_ctrlRoom',
            template: roomTpl,
            resolve: {
                roomData: function (userService, subscribePublish, $stateParams, roomService, $q, $state, sideBarService, $mdDialog) {
                    let defer = $q.defer();

                    roomService.get({id: $stateParams.id}).then(function (response) {
                        if (response.success) {
                            $mdDialog.cancel();
                            sideBarService.unLocked();

                            subscribePublish.publish({
                                name: 'roomOpen',
                                data: {id: $stateParams.id}
                            });

                            defer.resolve(response.room);
                        } else {
                            $state.go('resolve.main', {
                                message: response.message
                            });
                        }
                    });

                    return defer.promise;
                }
            }
        });
});