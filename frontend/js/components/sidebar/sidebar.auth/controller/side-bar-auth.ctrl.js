import module from '../../../';

module.controller('sideBarAuthController',
    function ($state, sideBarAuthService) {
        const _ctrlSideBar = this;

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

        _ctrlSideBar.toggle = sideBarAuthService.toggle;

        _ctrlSideBar.changeState = function (stateName) {
            sideBarAuthService.close();
            $state.go(stateName);
        };
    });