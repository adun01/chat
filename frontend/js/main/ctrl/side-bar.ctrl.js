import module from '../';

module.controller('sideBarController',
    function ($rootScope, $mdSidenav, userService, authService) {
        const _ctrlMain = this;

        _ctrlMain.data = {
            id: 'side-bar',
            opened: false,
            isAuth: false,
            listAuth: [
                {
                    name: 'Авторизация',
                    state: 'resolve.auth'
                }, {
                    name: 'Регистрация',
                    state: 'resolve.create'
                }
            ],
            user: null
        };

        _ctrlMain.toggleMenu = function () {
            _ctrlMain.data.opened = !_ctrlMain.data.opened;
            $mdSidenav(_ctrlMain.data.id).toggle();
        };

        _ctrlMain.getPathPhoto = userService.photo;

        $rootScope.$on('isAuth', function () {
            _ctrlMain.data.user = userService.get();
            _ctrlMain.data.isAuth = true;
        });
    });