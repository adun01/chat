import module from '../';
import userSearchTpl from '../view/user.search.html';

module.controller('roomController',
    function ($mdDialog, userService, roomService, roomMessageService, sideBarService, subscribePublish, $state) {

        const _ctrlRoom = this;

        sideBarService.unLocked();
        sideBarService.close();

        _ctrlRoom.toggleMenu = sideBarService.toggle;

        _ctrlRoom.room = roomService.getCurrentRoom();

        _ctrlRoom.user = userService.get();

        _ctrlRoom.message = null;

        _ctrlRoom.searchUsers = function (ev) {
            $mdDialog.show({
                template: userSearchTpl,
                targetEvent: ev,
                clickOutsideToClose: true,
                parent: angular.element(document.body)
            });
        };

        _ctrlRoom.send = function () {
            roomMessageService.save({
                roomId: _ctrlRoom.room.id,
                message: _ctrlRoom.message
            }).then(function (response) {
                if (response.success) {
                    _ctrlRoom.message = null;
                }
            });
        };

        subscribePublish.subscribe({
            name: 'roomListChangeRemove',
            fn: function (data) {
                if (+data.roomId === +_ctrlRoom.room.id) {
                    $state.go('resolve.main', {
                        message: 'Вы были исключены из комнаты ' + _ctrlRoom.room.name
                    });
                }
            }
        });

    });