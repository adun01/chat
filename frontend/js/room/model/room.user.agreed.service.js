import module from '../';

module.service('roomUserAgreedService', function (roomUserAgreedResource) {

    function get(data) {
        return roomUserAgreedResource.get(data).$promise;
    }

    return {
        get: get
    }
});