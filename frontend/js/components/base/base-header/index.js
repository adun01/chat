import module from '../../';
import baseHeaderTpl from './view/base.header.html';

module.component('baseHeader', {
    controller: 'baseHeaderController',
    controllerAs: '_ctrlBaseHeader',
    template: baseHeaderTpl
});