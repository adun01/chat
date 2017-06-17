import module from '../../';
import userActionsTpl from './view/user.actions.html';

module.directive('userActions', function () {
    return {
        controller: 'userActionsController',
        controllerAs: '_ctrlUserAction',
        template: userActionsTpl,
        scope: {
            user: '=',
            actionsRoom: '='
        }
    }
});