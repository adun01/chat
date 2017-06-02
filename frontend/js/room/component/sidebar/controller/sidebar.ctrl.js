import module from '../../../';

module.controller('sidebarController', function (sideBarService) {
    const _ctrlSidebar = this;

    _ctrlSidebar.toggleMenu = sideBarService.toggle;

});