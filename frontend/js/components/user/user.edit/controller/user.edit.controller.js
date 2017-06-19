import module from '../../../';

module.controller('userEditController',
    function (FileUploader, userService, $timeout, $rootScope, $mdDialog) {
        const _ctrlUser = this;

        _ctrlUser.user = userService.get();
        _ctrlUser.changeLogin = _ctrlUser.user.login;

        _ctrlUser.data = {
            form: {
                success: {
                    status: false,
                    message: ''
                },
                error: []
            },
            timer: null
        };

        _ctrlUser.uploader = new FileUploader({
            url: 'api/user/',
            filters: [
                {
                    name: 'extensions',
                    fn: function (item) {
                        if (!(/\.(jpg|jpeg|png)$/i).test(item.name)) {
                            _ctrlUser.data.form.error.push('Формат файла должен быть jpg, jpeg, png');
                        } else {
                            _ctrlUser.removeError();
                            return true;
                        }
                    }
                }, {
                    name: 'fileSize',
                    fn: function (item) {
                        if (item.size > 200000) {
                            _ctrlUser.data.form.error.push('Размер файла не должен превышать 2мб');
                        } else {
                            _ctrlUser.removeError();
                            return true;
                        }
                    }
                }
            ],
            queueLimit: 1,
            autoUpload: true,
            method: 'PUT',
            removeAfterUpload: true,
            onErrorItem: function () {
                _ctrlUser.data.form.error.push('Сервер погиб. Попробуйте позже');
            },
            onCompleteItem: function (item, response) {
                _ctrlUser.handlerResponse(response);
            }
        });

        _ctrlUser.removeError = function () {
            _ctrlUser.data.form.error = [];
        };

        _ctrlUser.getPathPhoto = userService.photo;

        _ctrlUser.update = function () {
            userService.update({
                id: _ctrlUser.user.id,
                login: _ctrlUser.changeLogin
            }).then(function (response) {
                _ctrlUser.handlerResponse(response);

                if (response.success && response.user) {
                    $rootScope.$emit('userReboot');
                    $mdDialog.hide();
                }
            });
        };

        _ctrlUser.handlerResponse = function (response) {
            if (_ctrlUser.data.timer) {
                clearInterval(_ctrlUser.data.timer);
            }
            _ctrlUser.removeError();
            _ctrlUser.data.form.success.status = response.success;

            if (response.success) {
                userService.set(response.user);
                _ctrlUser.data.form.success.message = response.message;
            } else {
                _ctrlUser.data.form.error.push(response.message);
                _ctrlUser.data.form.success.message = '';
            }

            _ctrlUser.data.timer = $timeout(function () {
                _ctrlUser.data.form.success.status = false;
                _ctrlUser.removeError();
            }, 5000).$$timeoutId;
        };
    });