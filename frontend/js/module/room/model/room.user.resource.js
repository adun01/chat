import module from '../';

module.service('roomUserResource', function ($resource) {
    return $resource('api/room/:roomId/user/:userId', {
        roomId: '@roomId',
        userId: '@userId'
    }, {
        update: {
            method: 'PUT'
        }
    });
});