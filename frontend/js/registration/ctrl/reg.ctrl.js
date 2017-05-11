import module from '../';

module.controller('registrationController', function ($rootScope, userService, $timeout, $state) {

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
                $state.go('resolve.main.room');
            }
        });
    };

});