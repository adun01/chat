import module from '../../../'

module.controller('baseHeaderController', function (roomService) {
    const _ctrlBaseHeader = this;

    _ctrlBaseHeader.addRoom = roomService.addRoom;
});