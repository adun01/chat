import module from '../';

module.controller('authController', function ($scope, authService, subscriberPublisher, $timeout) {
    const _ctrlAuth = this;

    _ctrlAuth.error = {};
    _ctrlAuth.errorMessage = null;

    _ctrlAuth.logIn = function () {
        authService.logIn({
            login: _ctrlAuth.login,
            password: _ctrlAuth.password
        });
    };

    subscriberPublisher.addChannels('logInAnswer', function (data) {
        _ctrlAuth.error = {};
        _ctrlAuth.errorMessage = null;
        if (!data.success) {
            $scope.$apply(function () {
                _ctrlAuth.errorMessage = data.message;
                _ctrlAuth.error.logIn = true;
            });
            $timeout(function () {
                _ctrlAuth.error = {};
                _ctrlAuth.errorMessage = null;
            }, 5000);
        } else {
            $state.go('room');
        }
    });
});