import module from '../';

module.controller('mainController', function ($mdSidenav) {
    const _ctrlMain = this;

    _ctrlMain.data = {
        id: 'main',
        opened: false,
        isAuth: false,
        listAuth: [
            {
                name: 'Авторизация',
                state: 'main.auth'
            }, {
                name: 'Регистрация',
                state: 'main.registration'
            }
        ]
    };

    _ctrlMain.toggleMenu = function () {
        _ctrlMain.data.opened = !_ctrlMain.data.opened;
        $mdSidenav(_ctrlMain.data.id).toggle();
    };

});