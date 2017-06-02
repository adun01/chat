import module from '../../../';

module.controller('messageAddController',
    function (roomService, roomMessageService, conversationMessageService) {

        const _ctrlMessageAdd = this;

        _ctrlMessageAdd.room = roomService.getCurrentRoom();

        _ctrlMessageAdd.message = null;
        _ctrlMessageAdd.save = _ctrlMessageAdd.room.conversation ? conversationMessageService.save : roomMessageService.save;

        _ctrlMessageAdd.send = function () {
            _ctrlMessageAdd.save({
                conversationId: _ctrlMessageAdd.room.user.id,
                roomId: _ctrlMessageAdd.room.id,
                message: _ctrlMessageAdd.message
            }).then(function (response) {
                if (response.success) {
                    _ctrlMessageAdd.message = null;
                }
            });
        };
    });