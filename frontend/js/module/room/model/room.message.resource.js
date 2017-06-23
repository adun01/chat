import module from '../';

module.service('roomMessageResource', function ($resource) {
    return $resource('api/room/:roomId/message/', {
        roomId: '@roomId'
    }, {
        update: {
            method: 'PUT'
        }
    });
});