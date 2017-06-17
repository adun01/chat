import module from '../../';
import baseTpl from './view/base.html';

module.component('baseDisplay', {
    controller: 'baseController',
    controllerAs: '_ctrlBase',
    template: baseTpl
});