import module from '../../';
import roomEditTpl from './view/room.edit.html';

module.directive('roomEdit', function () {
    return {
        controller: 'roomEditController',
        controllerAs: '_ctrlEditList',
        template: roomEditTpl,
        scope: {
            room: '='
        }
    }
});