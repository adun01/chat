import module from '../../../';

module.service('searchResource', function ($resource) {

    return $resource('/api/search', {}, {
        UPDATE: {
            method: 'PUT'
        }
    })
});