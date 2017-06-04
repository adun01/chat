import module from '../../../';

module.controller('messageAddController',
    function (roomService, roomMessageService, userService, conversationMessageService, roomUserAgreedService) {

        const _ctrlMessageAdd = this;

        _ctrlMessageAdd.room = roomService.getCurrentRoom();
        _ctrlMessageAdd.user = userService.get();

        if (!_ctrlMessageAdd.room.conversation) {
            _ctrlMessageAdd.access = _ctrlMessageAdd.room.userAgreed.some(function (userId) {
                return userId === _ctrlMessageAdd.user.id;
            });
        } else {
            _ctrlMessageAdd.access = true;
        }

        _ctrlMessageAdd.message = null;
        _ctrlMessageAdd.save = _ctrlMessageAdd.room.conversation ? conversationMessageService.save : roomMessageService.save;

        _ctrlMessageAdd.userAgreed = function () {

            roomUserAgreedService.save({
                roomId: _ctrlMessageAdd.room.id
            }).then(function (response) {
                if (response.success) {
                    _ctrlMessageAdd.access = true;
                }
            });
        };

        _ctrlMessageAdd.send = function () {
            _ctrlMessageAdd.save({
                conversationId: _ctrlMessageAdd.room.user ? _ctrlMessageAdd.room.user.id : null,
                roomId: _ctrlMessageAdd.room.id,
                message: _ctrlMessageAdd.message
            }).then(function (response) {
                if (response.success) {
                    _ctrlMessageAdd.message = null;
                }
            });
        };
    });