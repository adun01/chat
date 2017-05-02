import module from '../';

module.controller('registrationController', function ($scope, userService, subscriberPublisher, $timeout, $state) {

    const _ctrlReg = this;

    _ctrlReg.error = {};

    _ctrlReg.create = function () {
        subscriberPublisher.callSubscriber('createUser', {
            login: _ctrlReg.login,
            email: _ctrlReg.email,
            password: _ctrlReg.password
        });
    };

    subscriberPublisher.addChannels('createUserAnswer', function (data) {
        _ctrlReg.error = {};
        _ctrlReg.errorMessage = null;

        if (!data.success) {
            $scope.$apply(function () {
                _ctrlReg.errorMessage = data.message;
                _ctrlReg.error.create = true;
            });
            $timeout(function () {
                _ctrlReg.error = {};
                _ctrlReg.errorMessage = null;
            }, 5000);
        } else {
            $state.go('room');
        }
    });

});