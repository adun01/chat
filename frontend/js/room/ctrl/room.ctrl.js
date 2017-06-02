import module from '../';
import userSearchTpl from '../view/user.search.html';

module.controller('roomController',
    function ($scope, $mdDialog, userService, roomService, roomMessageService, sideBarService, $rootScope, $state, socketServiceMediator) {

        const _ctrlRoom = this;

        sideBarService.unLocked();
        sideBarService.close();

        _ctrlRoom.toggleMenu = sideBarService.toggle;

        _ctrlRoom.room = roomService.getCurrentRoom();

        _ctrlRoom.user = userService.get();

        socketServiceMediator.emit('roomOpen', {roomId: _ctrlRoom.room.id});

        _ctrlRoom.searchUsers = function (ev) {
            $mdDialog.show({
                template: userSearchTpl,
                targetEvent: ev,
                clickOutsideToClose: true,
                parent: angular.element(document.body)
            });
        };

        let roomListChangeRemove = $rootScope.$on('roomListChangeRemove', function ($event, data) {

            if (+data.roomId === +_ctrlRoom.room.id) {
                $state.go('main.base', {
                    message: 'Вы были исключены из комнаты ' + _ctrlRoom.room.name
                });
            }
        });

        $scope.$on('$destroy', function () {
            roomListChangeRemove();
        });
    });