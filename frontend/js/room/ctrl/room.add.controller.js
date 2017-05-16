import module from '../';

module.controller('roomAddController', function (FileUploader, $mdDialog, roomService, $rootScope, $state) {

    const roomAddCtrl = this;

    roomAddCtrl.userInvited = [];

    roomAddCtrl.addRoom = function () {
        roomService.create({
            name: roomAddCtrl.name,
            userInvited: roomAddCtrl.userInvited.reduce(function (prev, current) {
                if (prev === '') {
                    prev += current.id;
                } else {
                    prev += ',' + current.id;
                }
                return prev;
            }, '')
        }).then(function (response) {
            roomAddCtrl.close();
            $rootScope.$emit('roomListReInit', null);
            $state.go('resolve.main.room', {
                id: response.room.id
            });
        });
    };

    roomAddCtrl.close = function () {
        $mdDialog.cancel();
    };

});