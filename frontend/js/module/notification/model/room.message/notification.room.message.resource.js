import module from '../../';

module.service('notificationRoomMessageResource', function ($resource) {
    return $resource('api/room/:roomId/notification/message/:messageId', {
        messageId: '@messageId',
        roomId: '@roomId'
    }, {
        update: {
            method: 'PUT'
        }
    });
});