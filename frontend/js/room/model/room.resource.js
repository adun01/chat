import module from '../';

module.service('roomResource', function ($resource) {
    return $resource('api/room/', {}, {
        update: {
            method: 'PUT'
        }
    })
});