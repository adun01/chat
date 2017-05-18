import module from '../';
import showNotificationTpl from '../';

module.controller('sideBarController',
    function ($rootScope, $mdSidenav, userService, authService, $state, $mdDialog, sideBarService) {
        const _ctrlSideBar = this;

        _ctrlSideBar.data = {
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

        _ctrlSideBar.editUser = userService.editUser;

        _ctrlSideBar.getPathPhoto = userService.photo;

        $rootScope.$on('isAuth', function () {
            _ctrlSideBar.data.user = userService.get();
            if (_ctrlSideBar.data.user) {
                _ctrlSideBar.data.isAuth = true;
            } else {
                _ctrlSideBar.data.isAuth = false;
            }
        });
    });