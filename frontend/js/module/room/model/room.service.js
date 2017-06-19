import module from '../';

module.service('roomService', function (roomResource, $q, $mdDialog) {

    let currentRoom = null;

    function shortName(name) {
        return '' + name[0] + name[1];
    }

    function create(data) {
        return roomResource.save(data).$promise;
    }

    function get(data) {
        let defer = $q.defer();
        roomResource.get(data).$promise.then(function (response) {

            if (response.success) {
                if (response.collection) {

                    response.collection = response.collection.map(function (room) {
                        if (room.room) {
                            room.shortName = shortName(room.name);
                        }
                        return room;
                    });
                } else {
                    response.room.shortName = shortName(response.room.name)
                }

                defer.resolve(response);
            } else {
                defer.resolve(response);
            }
        });
        return defer.promise;
    }

    function addRoom(ev) {
        $mdDialog.show({
            template: '<md-dialog flex="80">' +
            '<room-add></room-add>' +
            '</md-dialog>',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true
        });
    }

    function showRoom(ev, room) {

        $mdDialog.show({
            controller: function(room) {
                const _ctrl = this;
                _ctrl.room = room;
            },
            controllerAs: '_ctrl',
            template: '<md-dialog flex="80">' +
            '<room-show data-room="_ctrl.room">' +
            '</room-show>' +
            '</md-dialog>',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            resolve: {
                room: () => {
                    return room;
                }
            }
        });
    }

    function getCurrentRoom() {
        return currentRoom;
    }

    function set(room) {
        currentRoom = room;
    }

    return {
        set: set,
        getCurrentRoom: getCurrentRoom,
        get: get,
        addRoom: addRoom,
        create: create,
        showRoom: showRoom,
        shortName: shortName
    }
});