import module from '../../';
import roomActionsTpl from './view/room.actions.html';

module.directive('roomActions', function () {
    return {
        controller: 'roomActionsController',
        controllerAs: '_ctrlRoomAction',
        template: roomActionsTpl,
        scope: {
            room: '='
        }
    }
});