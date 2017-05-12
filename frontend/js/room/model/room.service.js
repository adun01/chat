import module from '../';

module.service('roomService', function (roomResource, $q) {

    function shortName(room) {
        return room[0] + room[1];
    }

    function get() {
        let defer = $q.defer();
        roomResource.get().$promise.then(function (response) {
            response.list = response.list.map(function (room) {
                room.shortName = shortName(room.name);
                return room;
            });
            defer.resolve(response);
        });
        return defer.promise;
    }

    return {
        get: get
    }
});