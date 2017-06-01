import module from '../../../';

module.controller('messageListController', function ($scope, $timeout, roomService, roomMessageService, userService, $rootScope) {

    const _ctrlMessageList = this;

    _ctrlMessageList.data = {
        room: roomService.getCurrentRoom(),
        messages: []
    };

    _ctrlMessageList.showUser = userService.showUser;

    _ctrlMessageList.getPathPhoto = userService.photo;

    _ctrlMessageList.getMessage = function () {
        roomMessageService.get({roomId: _ctrlMessageList.data.room.id}).then(function (resp) {
            _ctrlMessageList.data.messages = resp.messages;
        });
    };

    _ctrlMessageList.getMessage();

    let newMessageRoom = $rootScope.$on('newMessageRoom', function ($event, data) {
        $timeout(function () {
            _ctrlMessageList.data.messages.push(data.message);
        });
    });

    $scope.$on('$destroy', function () {
        newMessageRoom();
    });

});