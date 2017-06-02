import module from '../../../';
import userSearchTpl from '../view/user.search.html';

module.controller('roomHeaderController', function (roomService, $mdDialog, userService) {
    const _ctrlHeaderList = this;

    _ctrlHeaderList.room = roomService.getCurrentRoom();
    _ctrlHeaderList.user = userService.get();

    if (_ctrlHeaderList.room.conversation) {
        _ctrlHeaderList.title = 'Беседа ' + _ctrlHeaderList.user.login + ' и ' + _ctrlHeaderList.room.user.login;
    } else {
        _ctrlHeaderList.title = 'Комната ' + _ctrlHeaderList.room.name;
    }

    _ctrlHeaderList.searchUsers = function (ev) {
        $mdDialog.show({
            template: userSearchTpl,
            targetEvent: ev,
            clickOutsideToClose: true,
            parent: angular.element(document.body)
        });
    };

});