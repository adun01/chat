import module from '../../';

module.service('notificationRoomService', function (notificationRoomResource, $q, roomService) {


    function get() {
        let defer = $q.defer();

        notificationRoomResource.get().$promise.then(function (response) {
            let rooms = response.rooms.map(function (room) {
                room.shortName = roomService.shortName(room.name);
                return room;
            });
            defer.resolve(rooms);
        });
        return defer.promise;
    }

    return {
        get: get
    }
});