import module from '../';
import userSearchTpl from '../view/user.search.html';

module.controller('roomController', function ($mdDialog, userService, roomService, roomMessageService, roomData, sideBarService) {

    const _ctrlRoom = this;

    sideBarService.unLocked();
    sideBarService.close();

    _ctrlRoom.toggleMenu = sideBarService.toggle;

    _ctrlRoom.data = {
        room: roomData,
        message: null,
        user: userService.get()
    };

    _ctrlRoom.searchUsers = function (ev) {
        $mdDialog.show({
            template: userSearchTpl,
            targetEvent: ev,
            clickOutsideToClose:true,
            parent: angular.element(document.body)
        });
    };

    _ctrlRoom.send = function () {
        roomMessageService.save({
            id: _ctrlRoom.data.room.id,
            message: _ctrlRoom.data.message
        }).then(function (response) {
            if (response.success) {
                _ctrlRoom.data.message = null;
            }
        });
    };
});