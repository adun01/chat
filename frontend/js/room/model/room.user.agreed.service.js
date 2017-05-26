import module from '../';

module.service('roomUserAgreedService', function (roomUserAgreedResource) {

    function get(data) {
        return roomUserAgreedResource.get(data).$promise;
    }

    function remove(data) {
        return roomUserAgreedResource.delete(data).$promise;
    }

    function save(data){
        return roomUserAgreedResource.save(data).$promise;
    }

    return {
        get: get,
        remove: remove,
        save: save
    }
});