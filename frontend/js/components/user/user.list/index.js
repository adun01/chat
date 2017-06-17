import module from '../../';
import userListTpl from './view/user.list.html'

module.directive('userList', function () {
    return {
        controller: 'userListController',
        controllerAs: '_ctrlUserList',
        template: userListTpl,
        scope: {
            room: '='
        }
    }
});