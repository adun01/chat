import module from '../';

module.service('userResource', function ($resource) {
    return $resource('api/registration', {}, {});
});