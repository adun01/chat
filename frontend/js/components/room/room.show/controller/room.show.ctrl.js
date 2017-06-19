import module from '../../../';

module.controller('roomShowController', function ($scope) {
    const _ctrlRoomShow = this;

    _ctrlRoomShow.room = $scope.room;
});