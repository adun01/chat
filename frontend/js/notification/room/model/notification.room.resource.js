import module from '../../';

module.service('notificationRoomResource', function ($resource) {
    return $resource('api/notification/room', {}, {
        update: {
            method: 'PUT'
        }
    });
});