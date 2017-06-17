import module from '../';

module.service('authResource', function ($resource) {
    return $resource('/api/auth/', {}, {
        update: {
            mathod: 'PUT'
        }
    });
});