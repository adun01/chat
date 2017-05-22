import module from '../../';
import userListTpl from './view/user.list.view.html'

module.component('userList', {
    controller: 'userListController',
    controllerAs: '_ctrlUserList',
    template: userListTpl
});