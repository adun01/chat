import module from '../';

module.controller('roomController', function (userService, roomService, roomMessageService, roomData, sideBarService) {

    const _ctrlRoom = this;

    sideBarService.unLocked();
    sideBarService.close();

    _ctrlRoom.data = {
        room: roomData,
        messages: [],
        message: null,
        user: userService.get()
    };

    _ctrlRoom.getMessage = function () {
        roomMessageService.get({id: _ctrlRoom.data.room.id}).then(function (resp) {
            _ctrlRoom.data.messages = resp.message;
        });
    };

    _ctrlRoom.toggleMenu = sideBarService.toggle;

    _ctrlRoom.send = function () {
        roomMessageService.save({
            id: _ctrlRoom.data.room.id,
            message: _ctrlRoom.data.message
        }).then(function (response) {
            if (response.success) {
                _ctrlRoom.data.message = null;
            }
        });
    };

    _ctrlRoom.getMessage();
});