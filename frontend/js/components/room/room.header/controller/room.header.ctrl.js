import module from '../../../';

module.controller('roomHeaderController', function (roomService, $mdDialog, userService) {
    const _ctrlHeaderRoom = this;

    _ctrlHeaderRoom.openRoom = function (event) {
        event.preventDefault();

        if (_ctrlHeaderRoom.room.conversation) {
            userService.showUser(event, _ctrlHeaderRoom.room.user);
        } else {
            roomService.showRoom(event, _ctrlHeaderRoom.room);
        }
    };

    _ctrlHeaderRoom.room = roomService.getCurrentRoom();
    _ctrlHeaderRoom.user = userService.get();

    if (_ctrlHeaderRoom.room.conversation) {

        _ctrlHeaderRoom.room.user = _ctrlHeaderRoom.room.usersCollection.find((user) => {
            return _ctrlHeaderRoom.user.id !== user.id;
        });
    }

});