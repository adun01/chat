import module from '../';

module.service('userResource', function ($resource) {
    return $resource('api/user/', null, {
        'update': {
            method: 'PUT'
        }
    });
});