import module from '../';

module.service('sideBarService', function ($mdSidenav) {

    const sidebar = this;

    sidebar.id = 'side-bar';
    sidebar.btnId = 'side-bar-close';
    sidebar.locked = false;
    sidebar.navOutId = 'sidebar-opener';

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
            document.getElementById(sidebar.btnId).classList.add('chat-hide');
            sidebar.locked = true;
        },
        unLocked: function () {
            document.getElementById(sidebar.btnId).classList.remove('chat-hide');
            sidebar.locked = false;
        },
        hideNavOut: function () {
            document.getElementById(sidebar.navOutId).classList.add('chat-hide');
        }
    };

});