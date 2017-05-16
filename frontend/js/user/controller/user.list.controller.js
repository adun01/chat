import module from '../';
import roomNotFoundTpl from '../../room/view/room.not.found.html';

module.controller('userListController', function (userService, roomService, roomUserAgreedService, $state, $mdDialog, $timeout) {
    const _ctrlUserList = this;

    _ctrlUserList.data = {
        room: {
            id: $state.params.id
        },
        userAgreed: []
    };

    _ctrlUserList.showUser = userService.showUser;

    _ctrlUserList.getPathPhoto = userService.photo;

    roomService.get({id: _ctrlUserList.data.room.id}).then(function (response) {
        if (response.success) {
            roomUserAgreedService.get({id:response.room.id}).then(function (response) {
                _ctrlUserList.data.userAgreed = response.userAgreed;
            });
        } else {
            $mdDialog.show({
                controller: 'roomNotFoundController',
                template: roomNotFoundTpl,
                parent: angular.element(document.body)
            });}
    });
});