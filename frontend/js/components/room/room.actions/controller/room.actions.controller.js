import module from '../../../';

module.controller('roomActionsController',
    function ($mdMenu, $scope, userService, roomUserService, $state) {
        const _ctrlRoomAction = this;

        _ctrlRoomAction.room = $scope.room;
        _ctrlRoomAction.user = userService.get();

        _ctrlRoomAction.creator = _ctrlRoomAction.room.creatorId === _ctrlRoomAction.user.id;

        _ctrlRoomAction.canLeaveRoom = function () {
            return _ctrlRoomAction.room.users.some(function (userId) {
                return userId === _ctrlRoomAction.user.id;
            });
        };

        _ctrlRoomAction.leaveRoom = function () {
            roomUserService.remove({
                roomId: _ctrlRoomAction.room.id
            }).then(function (response) {
                if (response.success) {
                    _ctrlRoomAction.room.users = _ctrlRoomAction.room.users.filter(function (userId) {
                        return userId !== _ctrlRoomAction.user.id;
                    });
                }
            });
        };

        _ctrlRoomAction.openRoom = function () {

            $state.go('main.room', {
                id: _ctrlRoomAction.room.id
            });
        };

        _ctrlRoomAction.openMenu = function ($mdMenu, ev) {
            $mdMenu.open(ev);
        };
    });