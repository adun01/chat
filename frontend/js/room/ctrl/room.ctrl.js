import module from '../';

module.controller('roomController',
    function ($scope, roomService, sideBarService, $rootScope, $state, socketServiceMediator) {

        const _ctrlRoom = this;

        sideBarService.unLocked();
        sideBarService.close();

        _ctrlRoom.room = roomService.getCurrentRoom();

        socketServiceMediator.emit('roomOpen', {roomId: _ctrlRoom.room.id});

        let roomListChangeRemove = $rootScope.$on('roomListChangeRemove', function ($event, data) {

            if (+data.roomId === +_ctrlRoom.room.id) {
                $state.go('main.base', {
                    message: 'Вы были исключены из комнаты ' + _ctrlRoom.room.name
                });
            }
        });

        $scope.$on('$destroy', function () {
            roomListChangeRemove();
        });
    });