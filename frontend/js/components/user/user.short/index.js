import module from '../../';
import userTpl from './view/user.view.html'

module.component('userShort', {
    controller: 'userController',
    controllerAs: '_ctrlUser',
    template: userTpl
});