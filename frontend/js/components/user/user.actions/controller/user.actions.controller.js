import module from '../../../';

module.controller('userActionsController',
    function ($scope, $mdMenu, userService, roomService, roomUserService, $state, $mdDialog) {
        const _ctrlUserAction = this;

        _ctrlUserAction.inRoom = false;
        _ctrlUserAction.creator = false;

        _ctrlUserAction.user = userService.get();
        _ctrlUserAction.room = roomService.getCurrentRoom();
        _ctrlUserAction.currentUser = $scope.user;

        _ctrlUserAction.actionsRoom = $scope.actionsRoom;
        _ctrlUserAction.invitedRoom = $scope.invitedRoom;

        _ctrlUserAction.selfUser = _ctrlUserAction.user.id === _ctrlUserAction.currentUser.id;

        if (_ctrlUserAction.room) {

            _ctrlUserAction.canLeaveRoom = function () {
                return _ctrlUserAction.room.users.some(function (iUserId) {
                    return iUserId === _ctrlUserAction.user.id;
                });
            };

            _ctrlUserAction.canBannedInRoom = _ctrlUserAction.room.creatorId === _ctrlUserAction.user.id && !_ctrlUserAction.selfUser;
        } else {
            _ctrlUserAction.canLeaveRoom = function () {
                return false;
            };

            _ctrlUserAction.canBannedInRoom = false;
        }

        _ctrlUserAction.showUser = userService.showUser;

        _ctrlUserAction.leaveRoom = function () {
            roomUserService.remove({
                roomId: _ctrlUserAction.room.id
            }).then(function (resp) {
                $mdDialog.hide();
                $state.go('main.base');
            });
        };

        _ctrlUserAction.removInRoom = function () {
            roomUserService.remove({
                roomId: _ctrlUserAction.room.id,
                userId: _ctrlUserAction.currentUser.id
            });
        };

        _ctrlUserAction.openMenu = function ($mdMenu, ev) {
            $mdMenu.open(ev);
        };

        _ctrlUserAction.openConversation = function ($event, user) {
            $event.preventDefault();

            $state.go('main.conversation', {
                id: user.id
            });
        };
    });