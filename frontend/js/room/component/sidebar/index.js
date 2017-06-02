import module from '../../';
import sidebarTpl from './view/sidebar.html';

module.component('sidebar', {
    template: sidebarTpl,
    controller: 'sidebarController',
    controllerAs: '_ctrlSidebar'
});