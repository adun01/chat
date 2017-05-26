import module from '../';

module.service('roomUserAgreedResource', function ($resource) {
    return $resource('api/room/:id/userAgreed/', {
        id: '@id'
    }, {
        update: {
            method: 'PUT'
        }
    });
});