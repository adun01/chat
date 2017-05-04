import module from '../';

module.controller('registrationController', function (userService, $timeout, $state, subscriberPublisher) {

    const _ctrlReg = this;

    _ctrlReg.error = {};

    _ctrlReg.create = function () {
        userService.create({
            login: _ctrlReg.login,
            email: _ctrlReg.email,
            password: _ctrlReg.password
        }).then(function (data) {
            _ctrlReg.error = {};
            _ctrlReg.errorMessage = null;

            if (!data.success) {

                _ctrlReg.errorMessage = data.message;
                _ctrlReg.error.create = true;
                $timeout(function () {
                    _ctrlReg.error = {};
                    _ctrlReg.errorMessage = null;
                }, 5000);
            } else {
                subscriberPublisher.callSubscriber('userAuth', data.user);
                $state.go('main.room');
            }
        });
    };

});