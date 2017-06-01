import module from '../';

module.service('sideBarService', function ($mdSidenav) {

    const sidebar = this;

    sidebar.id = 'side-bar';
    sidebar.btnId = 'side-bar-close';
    sidebar.locked = false;

    return {
        open: function () {
            $mdSidenav(sidebar.id).open();
        },
        toggle: function () {
            if (!sidebar.locked) {
                $mdSidenav(sidebar.id).toggle();
            }
        },
        close: function () {
            if (!sidebar.locked) {
                $mdSidenav(sidebar.id).close();
            }
        },
        locked: function () {
            document.getElementById(sidebar.btnId).disabled = true;
            sidebar.locked = true;
        },
        unLocked: function () {
            document.getElementById(sidebar.btnId).disabled = false;
            sidebar.locked = false;
        }
    };

});