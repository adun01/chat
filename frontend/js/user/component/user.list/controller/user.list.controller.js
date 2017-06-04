import module from '../../../';

module.controller('userListController',
    function ($scope, $rootScope, userService, roomUserAgreedService, roomService, $timeout, $state) {
        const _ctrlUserList = this;

        _ctrlUserList.user = userService.get();
        _ctrlUserList.room = roomService.getCurrentRoom();

        _ctrlUserList.data = {
            userList: []
        };

        _ctrlUserList.canRemove = +_ctrlUserList.user.id === +_ctrlUserList.room.creatorId;

        _ctrlUserList.getPathPhoto = userService.photo;

        _ctrlUserList.showUser = function (ev, user) {
            if (_ctrlUserList.user.id === user.id) {
                userService.editUser();
            } else {
                userService.showUser(ev, user);
            }
        };

        _ctrlUserList.openRoom = function (user) {
            $state.go('main.conversation', {
                id: user.id
            });
        };

        _ctrlUserList.getUsers = function () {
            roomUserAgreedService.get({roomId: _ctrlUserList.room.id}).then(function (response) {
                _ctrlUserList.data.userList = response.list;
            });
        };

        if (!_ctrlUserList.room.conversation) {

            let userListChange = $rootScope.$on('userListChange', function () {

                $timeout(function () {
                    _ctrlUserList.getUsers();
                });
            });

            $scope.$on('$destroy', function () {
                userListChange();
            });

            _ctrlUserList.getUsers();

        } else {
            _ctrlUserList.data.userList.push(_ctrlUserList.room.user);
        }

    });