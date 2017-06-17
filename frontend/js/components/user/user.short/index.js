import module from '../../';
import userTpl from './view/user.view.html'

module.component('userShort', {
    controller: 'userShortController',
    controllerAs: '_ctrlUser',
    template: userTpl
});