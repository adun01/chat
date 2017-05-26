import module from '../';

module.controller('userEditController',
    function (FileUploader, userService, $timeout, $rootScope, $mdDialog) {
        const _ctrlUserEdit = this;

        _ctrlUserEdit.user = userService.get();
        _ctrlUserEdit.changeLogin = _ctrlUserEdit.user.login;

        _ctrlUserEdit.data = {
            form: {
                success: {
                    status: false,
                    message: ''
                },
                error: []
            },
            timer: null
        };

        _ctrlUserEdit.uploader = new FileUploader({
            url: 'api/user/' + _ctrlUserEdit.user.id,
            filters: [
                {
                    name: 'extensions',
                    fn: function (item) {
                        if (!(/\.(jpg|jpeg|png)$/i).test(item.name)) {
                            _ctrlUserEdit.data.form.error.push('Формат файла должен быть jpg, jpeg, png');
                        } else {
                            _ctrlUserEdit.removeError();
                            return true;
                        }
                    }
                }, {
                    name: 'fileSize',
                    fn: function (item) {
                        if (item.size > 200000) {
                            _ctrlUserEdit.data.form.error.push('Размер файла не должен превышать 2мб');
                        } else {
                            _ctrlUserEdit.removeError();
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
                _ctrlUserEdit.data.form.error.push('Сервер погиб. Попробуйте позже');
            },
            onCompleteItem: function (item, response) {
                _ctrlUserEdit.handlerResponse(response);
            }
        });

        _ctrlUserEdit.removeError = function () {
            _ctrlUserEdit.data.form.error = [];
        };

        _ctrlUserEdit.getPathPhoto = userService.photo;

        _ctrlUserEdit.update = function () {
            userService.update({
                id: _ctrlUserEdit.user.id,
                login: _ctrlUserEdit.changeLogin
            }).then(function (response) {
                _ctrlUserEdit.handlerResponse(response);
            });
        };

        _ctrlUserEdit.close = function () {
            $mdDialog.cancel();
        };

        _ctrlUserEdit.handlerResponse = function (response) {
            if (_ctrlUserEdit.data.timer) {
                clearInterval(_ctrlUserEdit.data.timer);
            }
            _ctrlUserEdit.removeError();
            _ctrlUserEdit.data.form.success.status = response.success;

            if (response.success) {
                userService.set(response.user);
                $rootScope.$emit('isAuth');
                _ctrlUserEdit.data.form.success.message = response.message;
            } else {
                _ctrlUserEdit.data.form.error.push(response.message);
                _ctrlUserEdit.data.form.success.message = '';
            }

            _ctrlUserEdit.data.timer = $timeout(function () {
                _ctrlUserEdit.data.form.success.status = false;
                _ctrlUserEdit.removeError();
            }, 5000).$$timeoutId;
        };
    });
