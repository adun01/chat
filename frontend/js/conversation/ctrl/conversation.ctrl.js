import module from '../';
import userSearchTpl from '../../room/view/user.search.html';

module.controller('conversationController',
    function ($scope, $mdDialog, userService, roomService, roomMessageService, sideBarService, $rootScope, $state, socketServiceMediator) {

        const _ctrlConversation = this;

        sideBarService.unLocked();
        sideBarService.close();

        _ctrlConversation.toggleMenu = sideBarService.toggle;

        _ctrlConversation.room = roomService.getCurrentRoom();

        _ctrlConversation.user = userService.get();

        socketServiceMediator.emit('roomOpen', {roomId: _ctrlConversation.room.id});

        _ctrlConversation.searchUsers = function (ev) {
            $mdDialog.show({
                template: userSearchTpl,
                targetEvent: ev,
                clickOutsideToClose: true,
                parent: angular.element(document.body)
            });
        };

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