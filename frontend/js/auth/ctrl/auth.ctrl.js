import module from '../';

module.controller('authController', function (authService, $timeout, $state, subscriberPublisher) {
    const _ctrlAuth = this;

    _ctrlAuth.error = {};
    _ctrlAuth.errorMessage = null;

    _ctrlAuth.logIn = function () {
        authService.logIn({
            login: _ctrlAuth.login,
            password: _ctrlAuth.password
        }).then(function (data) {
            _ctrlAuth.error = {};
            _ctrlAuth.errorMessage = null;
            if (!data.success) {

                _ctrlAuth.errorMessage = data.message;
                _ctrlAuth.error.logIn = true;

                $timeout(function () {
                    _ctrlAuth.error = {};
                    _ctrlAuth.errorMessage = null;
                }, 5000);
            } else {
                subscriberPublisher.callSubscriber('userAuth', data.user);
                $state.go('main.room');
            }
        });
    };
});