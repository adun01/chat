import module from '../';

module.service('roomMessageService', function (roomMessageResource) {

    function get(data) {
        return roomMessageResource.get(data).$promise;
    }

    function save(data) {
        return roomMessageResource.save(data).$promise;
    }

    return {
        get: get,
        save: save
    };
});