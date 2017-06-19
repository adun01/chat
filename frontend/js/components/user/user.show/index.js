import module from '../../';
import userTpl from './view/user.show.html'

module.directive('userShow', () => {
    return {
        controller: 'userShowController',
        controllerAs: '_ctrlUser',
        template: userTpl,
        scope: {
            user: '='
        }
    }
});