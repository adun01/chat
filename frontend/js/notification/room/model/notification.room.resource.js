import module from '../../';

module.service('notificationRoomResource', function ($resource) {
    return $resource('api/room/:id/notification', {id: '@id'}, {
        update: {
            method: 'PUT'
        }
    });
});