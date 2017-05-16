import module from '../';

module.service('roomUserAgreedResource', function ($resource) {
    return $resource('api/room/userAgreed', {}, {
        update: {
            method: 'PUT'
        }
    })
});