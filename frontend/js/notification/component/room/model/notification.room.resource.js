import module from '../../../';

module.service('notificationRoomResource', function ($resource) {
    return $resource('api/room/notification', {}, {
        update: {
            method: 'PUT'
        }
    });
});