import module from '../';

module.service('roomUserInvitedResource', function ($resource) {
    return $resource('api/room/:id/userInvited/:userId', {
        id: '@id',
        userId: '@userId'
    }, {
        update: {
            method: 'PUT'
        }
    });
});