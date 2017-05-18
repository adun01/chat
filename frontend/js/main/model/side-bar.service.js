import module from '../';

module.service('sideBarService', function ($mdSidenav) {

    const sidebar = this;

    sidebar.data = {
        id: 'side-bar',
        locked: false
    };

    return {
        open: function () {
            $mdSidenav(sidebar.data.id).open();
        },
        toggle: function () {
            if (!sidebar.data.locked) {
                $mdSidenav(sidebar.data.id).toggle();
            }
        },
        close: function () {
            if (!sidebar.data.locked) {
                $mdSidenav(sidebar.data.id).close();
            }
        },
        locked: function () {
            sidebar.data.locked = true;
        },
        unLocked: function () {
            sidebar.data.locked = false;
        }
    };

});