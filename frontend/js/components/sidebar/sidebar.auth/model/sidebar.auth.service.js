import module from '../../../';

module.service('sideBarAuthService', function () {

    const sidebar = this;

    sidebar.open = false;

    sidebar.element = function () {
        return document.querySelector('.sidebar-auth');
    };

    sidebar.elementHelper = function () {
        return sidebar.element().querySelector('.sidebar-helper-nav');
    };

    function toggle() {
        sidebar.open = !sidebar.open;

        if (sidebar.open) {
            open();
        } else {
            close();
        }
    }

    function open() {
        sidebar.open = true;
        sidebar.elementHelper().classList.add('sidebar-helper-nav--open');
        sidebar.element().classList.add('sidebar--open');
    }

    function close() {
        sidebar.open = false;
        sidebar.elementHelper().classList.remove('sidebar-helper-nav--open');
        sidebar.element().classList.remove('sidebar--open');
    }

    return {
        toggle: toggle,
        open: open,
        close: close
    };

});