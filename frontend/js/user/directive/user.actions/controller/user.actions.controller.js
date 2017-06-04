import module from '../../../';

module.controller('userActionsController',
    function ($scope, $mdMenu, userService, roomService, roomUserAgreedService, roomUserInvitedService, $state) {
        const _ctrlUserAction = this;

        _ctrlUserAction.inRoom = false;
        _ctrlUserAction.creator = false;

        _ctrlUserAction.room = roomService.getCurrentRoom();
        _ctrlUserAction.currentUser = $scope.user;

        _ctrlUserAction.actionsRoom = $scope.actionsRoom;
        _ctrlUserAction.invitedRoom = $scope.invitedRoom;

        _ctrlUserAction.user = userService.get();

        _ctrlUserAction.selfUser = _ctrlUserAction.user.id === _ctrlUserAction.currentUser.id;

        if (_ctrlUserAction.room && _ctrlUserAction.actionsRoom) {
            _ctrlUserAction.inRoom = true;

            if (_ctrlUserAction.room.creatorId === _ctrlUserAction.user.id) {
                _ctrlUserAction.creator = true;
            }
        }

        _ctrlUserAction.canInvitedRoom = _ctrlUserAction.inRoom && _ctrlUserAction.actionsRoom && _ctrlUserAction.invitedRoom;
        _ctrlUserAction.canLeaveRoom = _ctrlUserAction.selfUser && _ctrlUserAction.inRoom;
        _ctrlUserAction.canRemoveRoom = _ctrlUserAction.creator && !_ctrlUserAction.selfUser;

        _ctrlUserAction.showUser = function ($event, user) {

            if (_ctrlUserAction.selfUser) {
                userService.editUser();
            } else {
                userService.showUser($event, user);
            }
        };

        _ctrlUserAction.removeInRoom = function () {
            roomUserAgreedService.remove({
                roomId: _ctrlUserAction.room.id,
                userId: _ctrlUserAction.currentUser.id
            });
        };

        _ctrlUserAction.addInvited = function () {
            roomUserInvitedService.save({
                userId: _ctrlUserAction.currentUser.id,
                id: _ctrlUserAction.room.id
            });
        };

        _ctrlUserAction.openMenu = function ($mdMenu, ev) {
            $mdMenu.open(ev);
        };

        _ctrlUserAction.openRoom = function ($event, user) {
            $event.preventDefault();

            $state.go('main.conversation', {
                id: user.id
            });
        };
    });