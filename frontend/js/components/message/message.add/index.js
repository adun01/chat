import module from '../../';
import messageTpl from './view/mesage.add.html';

module.component('messageAdd', {
    controller: 'messageAddController',
    controllerAs: '_ctrlMessageAdd',
    template: messageTpl
});