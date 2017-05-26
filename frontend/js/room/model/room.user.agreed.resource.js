import module from '../';

module.service('roomUserAgreedResource', function ($resource) {
    return $resource('api/room/:roomId/userAgreed/:userId', {
        userId: '@userId',
        roomId: '@roomId'
    }, {
        update: {
            method: 'PUT'
        }
    });
});