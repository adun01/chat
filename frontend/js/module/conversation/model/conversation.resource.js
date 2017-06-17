import module from '../';

module.service('conservationResource', function ($resource) {
    return $resource('/api/conversation/:id', {
        id: '@id'
    }, {
        update: {
            method: 'PUT'
        }
    })
});