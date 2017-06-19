import module from '../../../';

module.controller('roomAddController', function (FileUploader, $mdDialog, roomService, $rootScope, $state) {

    const _ctrlRoom = this;

    _ctrlRoom.userInvited = [];

    _ctrlRoom.error = false;
    _ctrlRoom.message = '';

    _ctrlRoom.addRoom = function () {
        roomService.create({
            name: _ctrlRoom.name,
            userInvited: _ctrlRoom.userInvited.reduce(function (prev, current) {
                if (prev === '') {
                    prev += current.id;
                } else {
                    prev += ',' + current.id;
                }
                return prev;
            }, '')
        }).then(function (response) {
            if (response.success) {
                _ctrlRoom.close();
                $state.go('main.room', {
                    id: response.room.id
                });
            } else {
                _ctrlRoom.error = true;
                _ctrlRoom.message = response.message || 'Не известная ошибка. Попробуйте позже.';
            }
        });
    };

    _ctrlRoom.close = function () {
        $mdDialog.cancel();
    };

});