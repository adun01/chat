import module from '../';

module.service('roomMessageResource', function ($resource) {
    return $resource('api/room/:id/message/', {
        id: '@id'
    }, {
        update: {
            method: 'PUT'
        }
    })
});