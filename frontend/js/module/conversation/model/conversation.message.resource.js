import module from '../';

module.service('conversationMessageResource', function ($resource) {
    return $resource('api/conversation/:conversationId/message/', {
        conversationId: '@conversationId'
    }, {
        update: {
            method: 'PUT'
        }
    })
});