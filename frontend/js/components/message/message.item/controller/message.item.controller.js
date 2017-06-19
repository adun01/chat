import module from '../../../';

module.controller('messageItemController',
    function ($scope, roomService, userService) {

        const _ctrlMessage = this;

        _ctrlMessage.room = roomService.getCurrentRoom();
        _ctrlMessage.user = userService.get();

        _ctrlMessage.message = $scope.message;

        _ctrlMessage.self = _ctrlMessage.message.user.id === _ctrlMessage.user.id;

        _ctrlMessage.showUser = userService.showUser;

        _ctrlMessage.photo = userService.photo;
    });