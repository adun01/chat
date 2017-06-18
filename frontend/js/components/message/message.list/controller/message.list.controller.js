import module from '../../../';

module.controller('messageListController',
    function ($element, $scope, $timeout, roomService, roomMessageService, conversationMessageService, userService, notificationRoomMessageService, notificationConversationMessageService, $rootScope) {

        const _ctrlMessageList = this;

        _ctrlMessageList.room = roomService.getCurrentRoom();
        _ctrlMessageList.user = userService.get();

        _ctrlMessageList.data = {
            messages: []
        };

        _ctrlMessageList.showUser = userService.showUser;

        _ctrlMessageList.getPathPhoto = userService.photo;

        _ctrlMessageList.getMessage = _ctrlMessageList.room.conversation ? conversationMessageService.get : roomMessageService.get;
        _ctrlMessageList.notificationServise = _ctrlMessageList.room.conversation ? notificationConversationMessageService : notificationRoomMessageService;

        _ctrlMessageList.init = function () {

            _ctrlMessageList.getMessage({
                roomId: _ctrlMessageList.room.id,
                conversationId: _ctrlMessageList.room.conversation ? _ctrlMessageList.room.user.id : null
            }).then(function (resp) {

                _ctrlMessageList.data.messages = resp.messages;
                _ctrlMessageList.sendNotificationMesage();

                $timeout(function () {
                    debugger;
                    document.querySelector('.message-overflow').scrollTop = $element[0].clientHeight;
                }, 1500);
            });
        };


        _ctrlMessageList.sendNotificationMesage = function () {
            if (_ctrlMessageList.data.messages.length) {
                let roomId;

                if (_ctrlMessageList.room.conversation) {
                    roomId = _ctrlMessageList.room.users.find(function (id) {
                        return _ctrlMessageList.user.id !== id;
                    });
                } else {
                    roomId = _ctrlMessageList.room.id;
                }

                _ctrlMessageList.notificationServise.save({
                    roomId: roomId,
                    conversationId: roomId,
                    messageId: _ctrlMessageList.data.messages[_ctrlMessageList.data.messages.length - 1]['id']
                });
            }
        };

        if (!_ctrlMessageList.room.banned) {
            _ctrlMessageList.init();
        }

        let newMessageRoom = $rootScope.$on('newMessageRoom', function ($event, data) {

            $timeout(function () {
                _ctrlMessageList.data.messages.push(data.message);
                _ctrlMessageList.sendNotificationMesage();
            });
        });

        $scope.$on('$destroy', function () {
            newMessageRoom();
        });
    });