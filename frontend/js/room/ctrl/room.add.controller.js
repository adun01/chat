import module from '../';

module.controller('roomAddController', function (FileUploader, $mdDialog, roomService, $rootScope, $state) {

    const roomAddCtrl = this;

    roomAddCtrl.userInvited = [];
    roomAddCtrl.public = true;

    roomAddCtrl.error = false;
    roomAddCtrl.message = '';

    roomAddCtrl.addRoom = function () {
        roomService.create({
            name: roomAddCtrl.name,
            public: roomAddCtrl.public,
            userInvited: roomAddCtrl.userInvited.reduce(function (prev, current) {
                if (prev === '') {
                    prev += current.id;
                } else {
                    prev += ',' + current.id;
                }
                return prev;
            }, '')
        }).then(function (response) {
            if (response.success) {
                roomAddCtrl.close();
                $state.go('main.room', {
                    id: response.room.id
                });
            } else {
                roomAddCtrl.error = true;
                roomAddCtrl.message = response.message || 'Не известная ошибка. Попробуйте позже.';
            }
        });
    };

    roomAddCtrl.close = function () {
        $mdDialog.cancel();
    };

});