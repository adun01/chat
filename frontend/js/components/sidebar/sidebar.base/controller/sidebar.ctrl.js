import module from '../../../';

module.controller('sidebarController', function (sideBarBaseService, authService) {
    const _ctrlSideBar = this;

    _ctrlSideBar.toggle = sideBarBaseService.toggle;

    _ctrlSideBar.logOut = authService.logOut;

});