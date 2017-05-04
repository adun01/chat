import module from '../';

module.controller('mainController', function ($mdSidenav, subscriberPublisher, userService, authService) {
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
        ],
        user: null
    };

    _ctrlMain.toggleMenu = function () {
        _ctrlMain.data.opened = !_ctrlMain.data.opened;
        $mdSidenav(_ctrlMain.data.id).toggle();
    };

    subscriberPublisher.addChannels('userAuth', function () {
        _ctrlMain.data.isAuth = true;
        _ctrlMain.data.user = userService.get();
    });

    authService.isLogin().then(function (response) {
        if(response.success) {
            subscriberPublisher.callSubscriber('userAuth', response.user);
        }
    })

});