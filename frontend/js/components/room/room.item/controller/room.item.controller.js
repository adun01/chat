import module from '../../../';

module.controller('roomItemController', function ($attrs, $scope, $state, $rootScope, $timeout) {
    const _ctrlRoomItem = this;

    _ctrlRoomItem.room = $scope.room;
    _ctrlRoomItem.lastMessage = $scope.lastMessage;
    _ctrlRoomItem.hideActions = $scope.hideActions;
    _ctrlRoomItem.align = $scope.align || 'left';

    _ctrlRoomItem.openRoom = function () {
        $state.go('main.room', {
            id: _ctrlRoomItem.room.id
        });
    };

    $rootScope.$on('messageNotification', function ($event, data) {
        if (data.roomId === _ctrlRoomItem.room.id) {
            $timeout(function () {
                if (!_ctrlRoomItem.room.notification) {
                    _ctrlRoomItem.room.notification = 1;
                } else {
                    _ctrlRoomItem.room.notification++;
                }
            });
        }
    });

});