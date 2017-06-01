import module from '../';

module.controller('sideBarController',
    function ($scope, $rootScope, $mdSidenav, userService, authService, $state, $mdDialog, sideBarService) {
        const _ctrlSideBar = this;

        _ctrlSideBar.user = null;
        _ctrlSideBar.isAuth = false;

        _ctrlSideBar.editUser = userService.editUser;

        _ctrlSideBar.getPathPhoto = userService.photo;

        _ctrlSideBar.data = {
            listAuth: [
                {
                    name: 'Авторизация',
                    state: 'main.auth'
                }, {
                    name: 'Регистрация',
                    state: 'main.create'
                }
            ]
        };

        _ctrlSideBar.toggleMenu = function () {
            sideBarService.toggle();
        };

        _ctrlSideBar.logOut = function () {
            authService.logOut().then(function () {
                $state.go('main.auth');
                userService.set(null);
                $rootScope.$emit('isAuth');
            });
        };

        let isAuth = $rootScope.$on('isAuth', function () {

            _ctrlSideBar.user = userService.get();

            if (_ctrlSideBar.user) {
                _ctrlSideBar.isAuth = true;
            } else {
                _ctrlSideBar.isAuth = false;
            }
        });

        $scope.$on('$destroy', function () {
            isAuth();
        });
    });