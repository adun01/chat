import module from '../';

module.service('roomResource', function ($resource) {
    return $resource('api/room/:id/', {
        id: '@id'
    }, {
        update: {
            method: 'PUT'
        }
    });
});