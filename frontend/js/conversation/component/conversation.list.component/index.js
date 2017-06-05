import module from '../../';
import conversationListTpl from './view/conversation.list.view.html';

module.component('conversationList', {
    controller: 'conversationListController',
    controllerAs: '_ctrlConversationList',
    template: conversationListTpl
});