import module from '../';
import roomAddTpl from '../view/room.add.html';

module.service('roomService', function (roomResource, $q, $mdDialog) {

    function shortName(room) {
        return room[0] + room[1];
    }

    function create(data) {
        return roomResource.save(data).$promise;
    }

    function get(data) {
        let defer = $q.defer();
        roomResource.get(data).$promise.then(function (response) {
            if (response.success) {
                if (response.list) {
                    response.list = response.list.map(function (room) {
                        room.shortName = shortName(room.name);
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
            controller: 'roomAddController',
            controllerAs: 'roomAddCtrl',
            template: roomAddTpl,
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true
        });
    }

    return {
        get: get,
        addRoom: addRoom,
        create: create
    }
});