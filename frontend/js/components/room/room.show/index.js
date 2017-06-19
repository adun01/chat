import module from '../../';
import roomShowTpl from './view/room.show.html';

module.directive('roomShow', function () {
    return {
        controller: 'roomShowController',
        controllerAs: '_ctrlRoomShow',
        template: roomShowTpl,
        scope: {
            room: '='
        }
    }
});