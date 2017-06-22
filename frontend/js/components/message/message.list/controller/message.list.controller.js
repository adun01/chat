import module from '../../../';

module.controller('messageListController',
    function ($element, $scope, $timeout, roomService, roomMessageService, conversationMessageService, userService, notificationRoomMessageService, notificationConversationMessageService, $rootScope) {

        const _ctrlMessageList = this;

        _ctrlMessageList.room = roomService.getCurrentRoom();
        _ctrlMessageList.user = userService.get();

        _ctrlMessageList.data = {
            messages: []
        };

        if (_ctrlMessageList.room.conversation) {

            _ctrlMessageList.room.userId = _ctrlMessageList.room.users.find((userId) => {
                return _ctrlMessageList.user.id !== userId;
            });
        }

        _ctrlMessageList.showUser = userService.showUser;

        _ctrlMessageList.getPathPhoto = userService.photo;

        _ctrlMessageList.getMessage = _ctrlMessageList.room.conversation ? conversationMessageService.get : roomMessageService.get;
        _ctrlMessageList.notificationServise = _ctrlMessageList.room.conversation ? notificationConversationMessageService : notificationRoomMessageService;

        _ctrlMessageList.init = function () {

            _ctrlMessageList.getMessage({
                roomId: _ctrlMessageList.room.id,
                conversationId: _ctrlMessageList.room.conversation ? _ctrlMessageList.room.userId : null
            }).then(function (resp) {

                _ctrlMessageList.data.messages = resp.messages;
                _ctrlMessageList.sendNotificationMessage();

                $timeout(function () {
                    document.querySelector('.message-overflow').scrollTop = $element[0].clientHeight;
                }, 1500);
            });
        };


        _ctrlMessageList.sendNotificationMessage = function () {
            if (_ctrlMessageList.data.messages.length) {

                _ctrlMessageList.notificationServise.save({
                    roomId: _ctrlMessageList.room.id,
                    conversationId: _ctrlMessageList.room.userId,
                    messageId: _ctrlMessageList.data.messages[_ctrlMessageList.data.messages.length - 1]['id']
                });
            }
        };

        if (!_ctrlMessageList.room.banned) {
            _ctrlMessageList.init();
        }

        let newMessageRoom = $rootScope.$on('newMessageRoom', function ($event, room) {
            $timeout(function () {
                _ctrlMessageList.data.messages.push(room.lastMessage);
                _ctrlMessageList.sendNotificationMessage();
            });
        });

        $scope.$on('$destroy', () => {
            newMessageRoom();
        });
    });