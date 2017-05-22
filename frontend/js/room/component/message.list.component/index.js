import module from '../../';
import userListTpl from './view/user.list.html';

module.component('messageList', {
    controller: 'messageListController',
    controllerAs: '_ctrlMessageList',
    template: userListTpl
});