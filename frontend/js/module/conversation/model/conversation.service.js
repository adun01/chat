import module from '../';

module.service('conversationService', function (conservationResource, $q) {

    function get(data) {
        return conservationResource.get(data).$promise;
    }

    return {
        get: get
    }
});