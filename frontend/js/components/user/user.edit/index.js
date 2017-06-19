import module from '../../';
import userTpl from './view/user.edit.html'

module.component('userEdit', {
        controller: 'userEditController',
        controllerAs: '_ctrlUser',
        template: userTpl
});