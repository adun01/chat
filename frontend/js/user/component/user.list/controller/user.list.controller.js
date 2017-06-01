import module from '../../../';

module.controller('userListController',
    function (userService, roomUserAgreedService, roomService) {
        const _ctrlUserList = this;

        _ctrlUserList.user = userService.get();
        _ctrlUserList.room = roomService.getCurrentRoom();

        _ctrlUserList.data = {
            userList: []
        };

        _ctrlUserList.canRemove = +_ctrlUserList.user.id === +_ctrlUserList.room.creatorId;

        _ctrlUserList.showUser = function (ev, user) {
            if (_ctrlUserList.user.id === user.id) {
                userService.editUser();
            } else {
                userService.showUser(ev, user);
            }
        };

        _ctrlUserList.getPathPhoto = userService.photo;

        _ctrlUserList.getUsers = function () {
            roomUserAgreedService.get({roomId: _ctrlUserList.room.id}).then(function (response) {
                _ctrlUserList.data.userList = response.list;
            });
        };

        _ctrlUserList.getUsers();

    });