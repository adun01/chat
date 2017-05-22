import module from '../../../';

module.controller('messageListController', function ($scope, roomService, roomMessageService, userService, socketService) {

    const _ctrlMessageList = this;

    _ctrlMessageList.data = {
        room: roomService.getCurrentRoom(),
        messages: []
    };

    _ctrlMessageList.showUser = userService.showUser;

    _ctrlMessageList.getPathPhoto = userService.photo;

    _ctrlMessageList.getMessage = function () {
        roomMessageService.get({id: _ctrlMessageList.data.room.id}).then(function (resp) {
            _ctrlMessageList.data.messages = resp.message;
        });
    };

    socketService.subscribe.subscribes({
        name: 'newMessage',
        fn: function (data) {
            if (_ctrlMessageList.data.room.id === +data.roomid) {
                data.message.user = data.user;
                _ctrlMessageList.data.messages.push(data.message);
            }
        }
    });

    _ctrlMessageList.getMessage();
});