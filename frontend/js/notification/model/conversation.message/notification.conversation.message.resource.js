import module from '../../';

module.service('notificationConversationMessageResource', function ($resource) {
    return $resource('api/conversation/:conversationId/notification/message/:messageId', {
        messageId: '@messageId',
        conversationId: '@conversationId'
    }, {
        update: {
            method: 'PUT'
        }
    });
});