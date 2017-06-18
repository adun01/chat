import module from '../../';
import roomItemTpl from './view/room.item.html'

module.directive('roomItem', function () {
    return {
        controller: 'roomItemController',
        controllerAs: '_ctrlRoomItem',
        template: roomItemTpl,
        scope: {
            room: '=',
            lastMessage: '=',
            hideActions: '=',
            align: '@'
        }
    }
});