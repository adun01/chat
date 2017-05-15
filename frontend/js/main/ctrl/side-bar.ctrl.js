import module from '../';

module.controller('sideBarController',
    function ($rootScope, $mdSidenav, userService, authService, $state) {
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

        _ctrlMain.logOut = function () {
            authService.logOut().then(function () {
                $state.go('resolve.auth');
                userService.set(null);
                $rootScope.$emit('isAuth');
            });
        };

        _ctrlMain.getPathPhoto = userService.photo;

        $rootScope.$on('isAuth', function () {
            _ctrlMain.data.user = userService.get();
            if (_ctrlMain.data.user) {
                _ctrlMain.data.isAuth = true;
            } else {
                _ctrlMain.data.isAuth = false;
            }
        });
    });