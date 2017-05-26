import module from '../../../';

module.controller('messageListController', function ($timeout, roomService, roomMessageService, userService, subscribePublish) {

    const _ctrlMessageList = this;

    _ctrlMessageList.data = {
        room: roomService.getCurrentRoom(),
        messages: []
    };

    _ctrlMessageList.showUser = userService.showUser;

    _ctrlMessageList.getPathPhoto = userService.photo;

    _ctrlMessageList.getMessage = function () {
        roomMessageService.get({roomId: _ctrlMessageList.data.room.id}).then(function (resp) {
            _ctrlMessageList.data.messages = resp.messages;
        });
    };

    _ctrlMessageList.getMessage();

    subscribePublish.subscribe({
        name: 'newMessageRoom',
        fn: function (data) {

            $timeout(function () {
                _ctrlMessageList.data.messages.push(data.message);
            });
        }
    });
});