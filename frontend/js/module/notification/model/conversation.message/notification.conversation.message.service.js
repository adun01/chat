import module from '../../';

module.service('notificationConversationMessageService', function (notificationConversationMessageResource) {

    function get(data) {
        return notificationConversationMessageResource.get(data).$promise;
    }

    function save(data) {
        return notificationConversationMessageResource.save(data).$promise;
    }

    return {
        get: get,
        save: save
    };
});