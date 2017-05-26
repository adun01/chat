import module from '../../../';

module.controller('userActionsController',
    function ($scope, $mdMenu, userService, roomUserAgreedService, roomUserInvitedService) {
        const _ctrlUserAction = this;

        _ctrlUserAction.room = $scope.room;
        _ctrlUserAction.user = $scope.user;

        _ctrlUserAction.selfUser = _ctrlUserAction.user.id === userService.get().id;

        _ctrlUserAction.canShowUser = $scope.showUser;
        _ctrlUserAction.canAddRoom = $scope.addRoom;
        _ctrlUserAction.canRemoveRoom = $scope.removeRoom;
        _ctrlUserAction.canExitRoom = $scope.exitRoom;

        _ctrlUserAction.currentUser = userService.get();

        _ctrlUserAction.showUser = userService.showUser;
        _ctrlUserAction.editUser = userService.editUser;

        _ctrlUserAction.removeInRoom = function () {
            roomUserAgreedService.remove({
                id: _ctrlUserAction.room.id
            });
        };

        _ctrlUserAction.addInvited = function () {
            roomUserInvitedService.save({
                userId: _ctrlUserAction.user.id,
                id: _ctrlUserAction.room.id
            });
        };

        _ctrlUserAction.openMenu = function ($mdMenu, ev) {
            $mdMenu.open(ev);
        };
    });