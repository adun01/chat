import module from '../';

module.controller('roomController',
    function ($scope, roomService, $rootScope, $state, socketService, roomData, $timeout) {

        const _ctrlRoom = this;

        roomService.set(roomData);

        _ctrlRoom.room = roomService.getCurrentRoom();

        if (!_ctrlRoom.room.banned) {
            socketService.emit('roomOpen', {roomId: _ctrlRoom.room.id});
        }

        let roomListChangeRemove = $rootScope.$on('banned', function ($event, data) {

            if (+data.roomId === +_ctrlRoom.room.id) {
                $timeout(function () {
                    _ctrlRoom.room.banned = true;
                });
            }
        });

        $scope.$on('$destroy', function () {
            roomListChangeRemove();
        });
    });