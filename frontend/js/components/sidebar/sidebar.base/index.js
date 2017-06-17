import module from '../../';
import sidebarTpl from './view/sidebar.html';

module.component('sidebarBase', {
    template: sidebarTpl,
    controller: 'sidebarController',
    controllerAs: '_ctrlSideBar'
});