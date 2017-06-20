import module from '../../';
import createTpl from './view/create.html';

module.component('userCreate', {
    template: createTpl,
    controller: 'userCreateController',
    controllerAs: '_ctrlUser'
});