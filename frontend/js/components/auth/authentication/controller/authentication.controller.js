import module from '../../../';

module.controller('authenticationController', function (authService, $timeout) {

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
                window.location.href = 'base/';
            }
        });
    };
});