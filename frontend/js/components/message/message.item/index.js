import module from '../../';
import messageItemTpl from './view/message.item.html';

module.directive('messageItem', () => {
    return {
        controller: 'messageItemController',
        controllerAs: '_ctrlMessage',
        template: messageItemTpl,
        scope: {
            message: '='
        }
    };
});