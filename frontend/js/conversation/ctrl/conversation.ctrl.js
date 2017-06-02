import module from '../';
import userSearchTpl from '../../room/view/user.search.html';

module.controller('conversationController',
    function ($scope, roomService, sideBarService, $rootScope, $state, socketServiceMediator) {

        const _ctrlConversation = this;

        sideBarService.unLocked();
        sideBarService.close();

        _ctrlConversation.room = roomService.getCurrentRoom();

        socketServiceMediator.emit('roomOpen', {roomId: _ctrlConversation.room.id});

        let roomListChangeRemove = $rootScope.$on('roomListChangeRemove', function ($event, data) {

            if (+data.roomId === +_ctrlConversation.room.id) {
                $state.go('main.base', {
                    message: 'Вы были исключены из комнаты ' + _ctrlConversation.room.name
                });
            }
        });

        $scope.$on('$destroy', function () {
            roomListChangeRemove();
        });
    });