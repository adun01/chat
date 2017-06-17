import module from '../../';
import sidebarAuthTPl from './view/sidebar.html';

module.component('sidebarAuth', {
    controller: 'sideBarAuthController',
    controllerAs: '_ctrlSideBar',
    template: sidebarAuthTPl
});