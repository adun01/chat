import module from '../../../';

module.service('sideBarBaseService', function () {

        const sidebar = this;

        sidebar.open = false;

        sidebar.element = function () {
            return document.querySelector('.sidebar-base');
        };
        sidebar.elementHelper = function () {
            return sidebar.element().querySelector('.sidebar-helper-nav');
        };

        function toggle() {
            if (!sidebar.open) {
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

    }
);