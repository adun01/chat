import module from '../../../';

module.controller('userCreateController', function (userService, $timeout) {

    const _ctrlUser = this;

    _ctrlUser.error = {};

    _ctrlUser.create = function () {
        userService.create({
            login: _ctrlUser.login,
            email: _ctrlUser.email,
            password: _ctrlUser.password
        }).then(function (data) {
            _ctrlUser.error = {};
            _ctrlUser.errorMessage = null;

            if (!data.success) {

                _ctrlUser.errorMessage = data.message;
                _ctrlUser.error.create = true;
                $timeout(function () {
                    _ctrlUser.error = {};
                    _ctrlUser.errorMessage = null;
                }, 5000);
            } else {
                window.location.href = 'base/';
            }
        });
    };

});