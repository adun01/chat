import module from '../../../';

module.controller('messageAddController', function ($scope, $timeout, roomService, roomMessageService, userService, $rootScope) {

    const _ctrlMessageAdd = this;

    _ctrlMessageAdd.room = roomService.getCurrentRoom();

    _ctrlMessageAdd.message = null;

    _ctrlMessageAdd.send = function () {
        roomMessageService.save({
            roomId: _ctrlMessageAdd.room.id,
            message: _ctrlMessageAdd.message
        }).then(function (response) {
            if (response.success) {
                _ctrlMessageAdd.message = null;
            }
        });
    };

});