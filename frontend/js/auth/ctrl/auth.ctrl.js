import module from '../';

module.controller('authController', function ($rootScope, authService, $timeout, $state, userService) {
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
                $state.go('resolve.main.room');
            }
        });
    };
});