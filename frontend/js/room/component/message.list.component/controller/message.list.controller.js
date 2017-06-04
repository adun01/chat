import module from '../../../';

module.controller('messageListController',
    function ($scope, $timeout, roomService, roomMessageService, conversationMessageService, userService, $rootScope) {

        const _ctrlMessageList = this;

        _ctrlMessageList.room = roomService.getCurrentRoom();
        _ctrlMessageList.user = userService.get();

        _ctrlMessageList.data = {
            messages: []
        };

        _ctrlMessageList.showUser = function ($event, user) {
            if (user.id === _ctrlMessageList.user.id) {
                userService.editUser($event);
            } else {
                userService.showUser($event, user);
            }
        };

        _ctrlMessageList.getPathPhoto = userService.photo;

        _ctrlMessageList.getMessage = _ctrlMessageList.room.conversation ? conversationMessageService.get : roomMessageService.get;

        _ctrlMessageList.init = function () {

            _ctrlMessageList.getMessage({
                roomId: _ctrlMessageList.room.id,
                conversationId: _ctrlMessageList.room.user ? _ctrlMessageList.room.user.id : null
            }).then(function (resp) {
                _ctrlMessageList.data.messages = resp.messages;
            });
        };

        _ctrlMessageList.init();

        let newMessageRoom = $rootScope.$on('newMessageRoom', function ($event, data) {

            $timeout(function () {
                _ctrlMessageList.data.messages.push(data.message);
            });
        });

        $scope.$on('$destroy', function () {
            newMessageRoom();
        });

    });