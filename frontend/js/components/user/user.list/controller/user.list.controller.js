import module from '../../../';

module.controller('userListController',
    function (userService, roomService, roomUserService, $scope) {
        const _ctrlUserList = this;

        _ctrlUserList.user = userService.get();
        _ctrlUserList.room = $scope.room;
        _ctrlUserList.filterOnline = false;

        _ctrlUserList.data = {
            userList: [],
            userListTrue: []
        };

        _ctrlUserList.showUser = function (ev, user) {
            if (_ctrlUserList.user.id === user.id) {
                userService.editUser();
            } else {
                userService.showUser(ev, user);
            }
        };

        _ctrlUserList.onlineFilter = function (online) {

            _ctrlUserList.filterOnline = online;

            if (!_ctrlUserList.filterOnline) {
                _ctrlUserList.data.userList = _ctrlUserList.data.userListTrue;
            } else {
                _ctrlUserList.data.userList = _ctrlUserList.data.userListTrue.filter(function (user ) {
                    return user.online;
                });
            }
        };

        _ctrlUserList.getUsers = function () {
            roomUserService.get({roomId: _ctrlUserList.room.id}).then(function (response) {

                _ctrlUserList.data.userList = response.users;
                _ctrlUserList.data.userListTrue = response.users;
            });
        };

        _ctrlUserList.getUsers();
    });