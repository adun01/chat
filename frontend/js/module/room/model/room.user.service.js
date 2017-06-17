import module from '../';

module.service('roomUserService', function (roomUserResource) {
    function save(data) {
        return roomUserResource.save(data).$promise;
    }

    function remove(data) {
        return roomUserResource.delete(data).$promise;
    }

    function get(data){
        return roomUserResource.get(data).$promise;
    }

    return {
        save: save,
        get: get,
        remove: remove
    }
});