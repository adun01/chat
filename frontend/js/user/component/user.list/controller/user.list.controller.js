import module from '../../../';

module.controller('userListController', function ($scope, userService, roomUserAgreedService, roomService) {
    const _ctrlUserList = this;

    _ctrlUserList.data = {
        room: roomService.getCurrentRoom(),
        userList: []
    };

    _ctrlUserList.showUser = userService.showUser;

    _ctrlUserList.getPathPhoto = userService.photo;

    roomUserAgreedService.get({id: _ctrlUserList.data.room.id}).then(function (response) {
        _ctrlUserList.data.userList = response.list;
    });
});