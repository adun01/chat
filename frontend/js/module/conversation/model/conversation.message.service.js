import module from '../';

module.service('conversationMessageService', function (conversationMessageResource) {

    function get(data) {
        return conversationMessageResource.get(data).$promise;
    }

    function save(data) {
        return conversationMessageResource.save(data).$promise;
    }

    return {
        get: get,
        save: save
    };
});