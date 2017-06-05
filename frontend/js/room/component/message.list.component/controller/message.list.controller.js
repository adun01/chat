import module from '../../../';

module.controller('messageListController',
    function ($scope, $timeout, roomService, roomMessageService, conversationMessageService, userService, notificationRoomMessageService, $rootScope) {

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
        _ctrlMessageList.notificationServise = _ctrlMessageList.room.conversation ? null : notificationRoomMessageService;

        _ctrlMessageList.init = function () {

            _ctrlMessageList.getMessage({
                roomId: _ctrlMessageList.room.id,
                conversationId: _ctrlMessageList.room.user ? _ctrlMessageList.room.user.id : null
            }).then(function (resp) {
                _ctrlMessageList.data.messages = resp.messages;
                _ctrlMessageList.sendNotificationMesage();
            });
        };


        _ctrlMessageList.sendNotificationMesage = function () {
            if (_ctrlMessageList.data.messages.length) {

                _ctrlMessageList.notificationServise.save({
                    roomId: _ctrlMessageList.room.id,
                    conversationId: _ctrlMessageList.room.conversation ? _ctrlMessageList.room.conversation.userId : null,
                    messageId: _ctrlMessageList.data.messages[_ctrlMessageList.data.messages.length - 1]['id']
                });
            }
        };

        _ctrlMessageList.init();

        let newMessageRoom = $rootScope.$on('newMessageRoom', function ($event, data) {

            $timeout(function () {
                _ctrlMessageList.data.messages.push(data.message);
                _ctrlMessageList.sendNotificationMesage();
            });
        });

        $scope.$on('$destroy', function () {
            newMessageRoom();
        });

        $rootScope.$emit('clearNotificationCount', {
            roomId: _ctrlMessageList.room.id
        });

    });