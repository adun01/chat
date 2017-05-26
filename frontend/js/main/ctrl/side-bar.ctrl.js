import module from '../';
import showNotificationTpl from '../';

module.controller('sideBarController',
    function ($rootScope, $mdSidenav, userService, authService, $state, $mdDialog, sideBarService) {
        const _ctrlSideBar = this;

        _ctrlSideBar.user = null;
        _ctrlSideBar.isAuth = false;

        _ctrlSideBar.editUser = userService.editUser;

        _ctrlSideBar.getPathPhoto = userService.photo;

        _ctrlSideBar.data = {
            listAuth: [
                {
                    name: 'Авторизация',
                    state: 'resolve.auth'
                }, {
                    name: 'Регистрация',
                    state: 'resolve.create'
                }
            ]
        };

        _ctrlSideBar.toggleMenu = function () {
            sideBarService.toggle();
        };

        _ctrlSideBar.logOut = function () {
            authService.logOut().then(function () {
                $state.go('resolve.auth');
                userService.set(null);
                $rootScope.$emit('isAuth');
            });
        };

        $rootScope.$on('isAuth', function () {

            _ctrlSideBar.user = userService.get();

            if (_ctrlSideBar.user) {
                _ctrlSideBar.isAuth = true;
            } else {
                _ctrlSideBar.isAuth = false;
            }
        });
    });