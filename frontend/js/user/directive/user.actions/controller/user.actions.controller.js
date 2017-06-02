import module from '../../../';

module.controller('userActionsController',
    function ($scope, $mdMenu, userService, roomUserAgreedService, roomUserInvitedService, $state) {
        const _ctrlUserAction = this;

        _ctrlUserAction.room = $scope.room;
        _ctrlUserAction.user = $scope.user;

        _ctrlUserAction.selfUser = _ctrlUserAction.user.id === userService.get().id;

        _ctrlUserAction.canOpenRoom = $scope.openRoom;

        _ctrlUserAction.canShowUser = $scope.showUser;
        _ctrlUserAction.canAddRoom = $scope.addRoom;
        _ctrlUserAction.canRemoveRoom = $scope.removeRoom;
        _ctrlUserAction.canExitRoom = $scope.exitRoom;

        _ctrlUserAction.currentUser = userService.get();

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
                userId: _ctrlUserAction.user.id
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

        _ctrlUserAction.openRoom = function ($event, user) {
            $event.preventDefault();

            $state.go('main.conversation', {
                id: user.id
            });
        };
    });