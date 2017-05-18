import module from '../../';

module.controller('notificationShowController', function ($rootScope, notificationsData, $mdDialog, notificationRoomService) {
    const _ctrlNSRoom = this;

    _ctrlNSRoom.data = {
        list: notificationsData
    };

    _ctrlNSRoom.remove = _ctrlNSRoom.save = function (room) {
        notificationRoomService.remove(room).then(function (response) {
            if (response.success) {
                _ctrlNSRoom.clear(room);
            }
        });
    };

    _ctrlNSRoom.save = function (room) {
        notificationRoomService.save(room).then(function (response) {
            if (response.success) {
                _ctrlNSRoom.clear(room);
            }
        });
    };

    _ctrlNSRoom.clear = function (room) {
        _ctrlNSRoom.data.list = _ctrlNSRoom.data.list.filter(function (iRoom) {
            return iRoom.id !== room.id;
        });
        if (!_ctrlNSRoom.data.list.length) {
            _ctrlNSRoom.close();
        }
    };

    _ctrlNSRoom.close = function () {
        $rootScope.$emit('roomListReInit');
        $mdDialog.hide(_ctrlNSRoom.data.list);
    };
});