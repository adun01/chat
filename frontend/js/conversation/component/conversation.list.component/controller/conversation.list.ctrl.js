import module from '../../../';

module.controller('conversationListController',
    function (conversationService, $state, userService) {
        const _ctrlConversationList = this;

        _ctrlConversationList.data = {
            conversations: []
        };

        _ctrlConversationList.photo = userService.photo;

        _ctrlConversationList.openConversation = function (conversation) {
            $state.go('main.conversation', {
                id: conversation.user.id
            });
        };

        function getListConversation() {
            conversationService.get().then(function (response) {
                _ctrlConversationList.data.conversations = response.conversations;
            });
        }

        getListConversation();
    });