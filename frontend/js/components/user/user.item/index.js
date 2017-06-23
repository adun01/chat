import module from '../../';
import userItemTpl from './view/user.item.html';

module.directive('userItem', function () {
    return {
        controller: 'userItemController',
        controllerAs: '_ctrlUserItem',
        template: userItemTpl,
        scope: {
            user: '=',
            hideActions: '=',
            lastMessage: '=',
            align: '@'
        }
    };
});