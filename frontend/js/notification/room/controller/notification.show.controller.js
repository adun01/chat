import module from '../../';

module.controller('notificationShowController',
    function (notificationsData, $mdDialog, roomUserAgreedService, roomUserInvitedService, userService, subscribePublish) {
        const _ctrlNSRoom = this;

        _ctrlNSRoom.user = userService.get();

        _ctrlNSRoom.data = {
            list: notificationsData
        };

        _ctrlNSRoom.remove = function (room) {

            roomUserAgreedService.remove({
                roomId: room.id,
                userId: _ctrlNSRoom.user.id
            }).then(function (response) {
                if (response.success) {
                    _ctrlNSRoom.clear(room);
                }
            });

        };

        _ctrlNSRoom.save = function (room) {
            roomUserAgreedService.save({
                roomId: room.id
            }).then(function (response) {
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
            $mdDialog.hide();
        };
    });