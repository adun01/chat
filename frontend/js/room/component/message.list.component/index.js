import module from '../../';
import messageListTpl from './view/message.list.html';

module.component('messageList', {
    controller: 'messageListController',
    controllerAs: '_ctrlMessageList',
    template: messageListTpl
});