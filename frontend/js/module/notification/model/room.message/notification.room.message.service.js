import module from '../../';

module.service('notificationRoomMessageService', function (notificationRoomMessageResource) {

    function get(data) {
        return notificationRoomMessageResource.get(data).$promise;
    }

    function save(data) {
        return notificationRoomMessageResource.save(data).$promise;
    }

    return {
        get: get,
        save: save
    };
});